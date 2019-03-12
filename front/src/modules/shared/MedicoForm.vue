<template>
  <div>
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
        <option v-for="h in hoursList" :value="h" :key="h">{{ h }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    Datepicker
  },
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
      ptBR: ptBR,
      medicoSchedule: null,
      loadingSchedule: false,
      hoursList: [],
    };
  },
  methods: {
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
    }
  }
};
</script>

<style>
</style>
