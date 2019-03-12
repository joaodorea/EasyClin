<template>
  <div class="container">
    <div class="row">
      <h2>Minha conta</h2>
      <div class="col-md-12">
        <p>
          <span class="text-muted">Nome:</span>
          <span>{{ user.email }}</span>
        </p>
        <p>
          <span class="text-muted">Função:</span>
          <span>{{ user.profile }}</span>
        </p>
      </div>
    </div>
    <div v-if="user.profile == 'Médico'" class="row">
      <div class="col-md-12">
        <h3>Horário de atendimento</h3>
      </div>
        <div v-for="(day, i) in agenda" class="noUiSlider col" :class="{dayOff: day.dayOff}" :key="i">
          <h4>{{ i }}</h4>
          <input v-mask="['##:##','#:##']" class="inputHelper" type="text" v-model="day.min" width="50px">
          <div :id="i"></div>
          <input v-mask="['##:##','#:##']" class="inputHelper" type="text" v-model="day.max" width="50px">
          <button class="btn btn-outline-primary btn-sm" @click="day.dayOff = !day.dayOff">Folga</button>
        </div>
        <button @click="save" class="btn btn-block btn-outline-success mt-3">Salvar</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from 'vue-the-mask';
import noUiSlider from "nouislider";

export default {
  data() {
    return {
      agenda: {
        segunda: {
          id: 1,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
        terca: {
          id: 2,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
        quarta: {
          id: 3,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
        quinta: {
          id: 4,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
        sexta: {
          id: 5,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
        sabado: {
          id: 6,
          minRaw: 800,
          maxRaw: 1000,
          min: 0,
          max: 0,
          dayOff: false
        },
      }
    };
  },
  directives: {mask},
  computed: {
    ...mapGetters({
      user: "account/user"
    })
  },
  methods: {
    ...mapActions({
      saveSchedule: "account/saveSchedule"
    }),
    save() {
      this.saveSchedule({ id: this.user._id, schedule: this.agenda })
        .then( resp => {
          if(resp.data.status == "OK") {
            alert("Agenda cadastrada com sucesso!")
          }
        })
    }
  },
  mounted() {
    const vm = this;
    const i = 0;
    const handlesSlider = document.getElementById("slider-handles");
    function sliderCreator(el, startMin, startMax) {
      noUiSlider
        .create(el, {
          start: [startMin, startMax],
          step: 50,
          orientation: "vertical",
          connect: true,
          range: {
            min: [100],
            max: [2400]
          }
        }).on("update", function(values, handle) {
          const target = vm.agenda[this.target.id];
          let min = values[0].toString();
          let max = values[1].toString();

          target.minRaw = values[0]
          target.maxRaw = values[1]

          if(+min >= 1000) { // 4 digitos
            vm.agenda[this.target.id].min = vm.$moment().hour(min[0] + min[1]).minute((min[2] + min[3])*0.6).format('HH:mm');
          } else { // 3 digitos
            vm.agenda[this.target.id].min = vm.$moment().hour(min[0]).minute((min[1] + min[2])*0.6).format('HH:mm');
          }
          if(+max >= 1000) {
            vm.agenda[this.target.id].max = vm.$moment().hour(max[0] + max[1]).minute((max[2] + max[3])*0.6).format('HH:mm');
          } else {
            vm.agenda[this.target.id].max = vm.$moment().hour(max[0]).minute((max[1] + max[2])*0.6).format('HH:mm');
          }
        });
    }
    vm.agenda = vm.user.schedule;
    document.querySelectorAll('.noUiSlider > div').forEach(e => {
      sliderCreator(e, +vm.agenda[e.id].minRaw, +vm.agenda[e.id].maxRaw);
    })
  }
};
</script>

<style>
.noUiSlider > div {
  height: 300px;
}
.inputHelper {
  width: 50px;
}
.col {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.col > * {
  margin: 5px auto;
  text-align: center;
}
.col.dayOff > *:not(button) {
  opacity: .3;
}
</style>
