<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="save">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Paciente</label>
              <select class="form-control" v-model="item.paciente">
                <option disabled value>Selecione um paciente</option>
                <option v-for="p in nova.pacientes" :value="p._id" :key="p._id">{{ p.name }}</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">Médico</label>
              <select class="form-control" v-model="item.medico" @change="getSchedule">
                <option disabled value>Selecione um médico</option>
                <option v-for="m in nova.medicos" :value="m._id" :key="m.id">{{ m.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="inputName">Nome/Tipo</label>
              <input type="text" class="form-control" id="inputLocal" v-model="item.name">
            </div>
            <div class="form-group col-md-3">
              <label for="inputLocal">Local</label>
              <input type="text" class="form-control" id="inputLocal" v-model="item.local">
            </div>
            <div class="form-group col-md-3" :class="{loading: loadingSchedule}">
              <label for="inputDia">Dia da consulta</label>
              <datepicker
                :language="ptBR"
                input-class="form-control"
                v-model="item.data"
                :disabledDates="disabledDates"
                @selected="getHoursList"
              ></datepicker>
            </div>
            <div class="form-group col-md-3" :class="{ loading: loadingSchedule }">
              <label for="inputTime">Horário da consulta</label>
              <select name="inputTime" id="inputTime" class="form-control" v-model="item.hora">
                <option :disabled="isAvailable(h)" v-for="h in hoursList" :value="h" :key="h">
                  {{ h }}<span v-if="isAvailable(h)"> - Horário indisponível</span>
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Descrição</label>
            <textarea name id class="form-control" cols="5" rows="3" v-model="item.desc"></textarea>
          </div>
          <div class="form-row">
            <button type="submit" class="btn btn-primary ml-auto">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import Datepicker from "vuejs-datepicker";
import { ptBR } from 'vuejs-datepicker/dist/locale';

export default {
  data() {
    return {
      item: {
        desc: "",
        local: "",
        data: new Date(),
        hora: ""
      },
      disabledDates: {
        customPredictor: date => {
          let weekDay = this.$moment(date).format("e");
          return weekDay == 0 || weekDay == 6;
        }
      },
      notAvailable: {},
      medicoSchedule: null,
      loadingSchedule: false,
      hoursList: [],
      ptBR: ptBR,
    };
  },
  components: {
    Datepicker
  },
  computed: {
    ...mapGetters({
      nova: "consultas/new"
    })
  },
  methods: {
    ...mapActions({
      consulta: "consultas/new",
      create: "consultas/create",
      getMedico: "account/getMedico"
    }),
    save() {
      this.item.dia = this.$moment(this.item.data).format('DD/MM/YYYY');
      this.create(this.item).then( res => {
        if (res.data.status == "OK") {
          alert("Consulta marcada com sucesso!");
          this.$router.go(-1);
        }
      });
    },
    getSchedule() {
      this.loadingSchedule = true;
      const vm = this;
      this.getMedico(this.item.medico)
        .then( res => {
          this.medicoSchedule = res.data.schedule;
          res.data.notAvailable.reduce((acc, cur) => {
            if(acc[cur.dia]) {
              acc[cur.dia].push(cur.hora) 
            } else {
              acc[cur.dia] = [cur.hora]
            }
            return acc;
          }, vm.notAvailable)
          this.loadingSchedule = false;
          
          this.disabledDates = {
            customPredictor: date => {
              let weekDay = this.$moment(date).format("e");
              let wd;
              for(wd in this.medicoSchedule) {
                if(this.medicoSchedule[wd].id == weekDay)
                  return this.medicoSchedule[wd].dayOff;
              }
            }
          }
        })
    },
    getHoursList(e) {
      this.hoursList = [];
      const vm = this;
      let ms;
      for(ms in this.medicoSchedule) {
        var list = this.medicoSchedule[ms]
        if(list.id == this.$moment(e).format('e')) {
          let str;
          for(let i = +list.minRaw; i <= +list.maxRaw; i += 50) {
            str = i.toString();
            if(+str >= 1000) { // 4 digitos
              vm.hoursList.push(vm.$moment().hour(str[0] + str[1]).minute((str[2] + str[3])*0.6).format('HH:mm'));
            } else { // 3 digitos
              vm.hoursList.push(vm.$moment().hour(str[0]).minute((str[1] + str[2])*0.6).format('HH:mm'));
            }
          }
        }
      }
    },
    isAvailable(hora) {
      const formatedDate = this.$moment(this.item.data).format('DD/MM/YYYY');
      const list = this.notAvailable[formatedDate];
      return list ? list.indexOf(hora) !== -1 : false;
    }
  },
  async created() {
    await this.consulta();
  }
};
</script>
<style>
.vdp-datepicker .form-control:disabled,
.vdp-datepicker .form-control[readonly] {
  background-color: #fff;
}
.form-group.loading {
  opacity: .5;
  cursor: not-allowed;
}
</style>
