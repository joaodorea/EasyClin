<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <form @submit.prevent="save">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Paciente</label>
              <h3>
                {{ item.paciente.name }}
                <router-link tag="small" class="ml-5" :to="'/pacientes/' + item.paciente._id">
                  <i class="fas fa-external-link-alt"></i>
                </router-link>
              </h3>
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">Médico</label>
              <h3>{{ item.medico.name }}</h3>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputLocal">Local</label>
              <input type="text" class="form-control" id="inputLocal" v-model="item.local">
            </div>
            <div class="form-group col-md-3">
              <label for="inputDia">Dia da consulta</label>
              <datepicker
                :language="ptBR"
                input-class="form-control"
                v-model="formatedDate"
                :disabledDates="disabledDates"
                @selected="getHoursList"
              ></datepicker>
            </div>
            <div class="form-group col-md-3">
              <label for="inputTime">Horário da consulta</label>
              <input
                type="time"
                name="inputTime"
                step="1800"
                id="inputTime"
                class="form-control"
                :value="item.hora"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Descrição</label>
            <textarea name id class="form-control" cols="5" rows="3" v-model="item.desc"></textarea>
          </div>
          <div class="col-md-12">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="confirmDelete(item._id)"
            >Desmarcar</button>
            <button type="submit" class="btn btn-primary float-right">Salvar</button>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <receitas :paciente="item.paciente"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import receitas from "./receitas";

import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    receitas,
    Datepicker
  },
  data() {
    return {
      ptBR: ptBR,
      disabledDates: {
        customPredictor: date => {
          let weekDay = this.$moment(date).format("e");
          return weekDay == 0 || weekDay == 6;
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      item: "consultas/item"
    }),
    formatedDate: {
      get() {
        const dia = this.item.dia;
        return this.$moment(dia, "DD/MM/YYYY").format("MM/DD/YYYY");
      },
       set(newValue) {
         this.item.dia = this.$moment(newValue, "MM/DD/YYYY").format("DD/MM/YYYY");
       }
    }
  },
  methods: {
    ...mapActions({
      get: "consultas/getOne",
      delete: "consultas/delete",
      update: "consultas/update"
    }),
    confirmDelete(id) {
      if (confirm("Tem certeza que deseja desmarcar essa consulta?")) {
        this.delete(id);
        this.$router.go(-1);
      }
    },
    save() {
      this.update(this.item).then(resp => {
        if (resp.status == "OK") {
          alert("Consulta atualizada com sucesso!");
        }
      });
    },
    getHoursList(e) {
      this.hoursList = [];
      const vm = this;
      let ms;
      for (ms in this.medicoSchedule) {
        var list = this.medicoSchedule[ms];
        if (list.id == this.$moment(e).format("e")) {
          let str;
          for (let i = +list.minRaw; i <= +list.maxRaw; i += 50) {
            str = i.toString();
            if (+str >= 1000) {
              // 4 digitos
              vm.hoursList.push(
                vm
                  .$moment()
                  .hour(str[0] + str[1])
                  .minute((str[2] + str[3]) * 0.6)
                  .format("HH:mm")
              );
            } else {
              // 3 digitos
              vm.hoursList.push(
                vm
                  .$moment()
                  .hour(str[0])
                  .minute((str[1] + str[2]) * 0.6)
                  .format("HH:mm")
              );
            }
          }
        }
      }
    }
  },
  created() {
    this.get(this.$route.params.id);
  }
};
</script>
<style scoped>
input[type="radio"] {
  margin-left: 10px;
}
h3 small {
  cursor: pointer;
}
</style>
