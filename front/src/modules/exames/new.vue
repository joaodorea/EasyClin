<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto">
        <form @submit.prevent="enviar">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPaciente">Paciente</label>
              <select id="inputPaciente" class="form-control" v-model="exame.paciente">
                <option disabled value>Selecione um paciente</option>
                <option v-for="p in novo.pacientes" :value="p._id" :key="p._id">{{p.name}}</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="inputDia">Dia da consulta</label>
              <input type="date" name="dia" id="inputDia" class="form-control" v-model="exame.data">
            </div>
            <div class="form-group col-md-3">
              <label for="inputTime">Horário da consulta</label>
              <input
                type="time"
                name="inputTime"
                id="inputTime"
                class="form-control"
                v-model="exame.hora"
              >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputName">Nome do exame</label>
              <input type="text" class="form-control" id="inputName" v-model="exame.name">
            </div>
            <div class="form-group col-md-6">
              <label for="inputLocal">Local</label>
              <input type="text" class="form-control" id="inputLocal" v-model="exame.local">
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Descrição</label>
            <textarea name id class="form-control" cols="5" rows="3" v-model="exame.desc"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputorigem">Origem:</label>
              <br>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" :class="exame.origem == 'Emitido' ? 'btn-success' : 'btn-outline-success'" class="btn" @click="exame.origem = 'Emitido'">Emitido</button>
                <button type="button" :class="exame.origem == 'Recebido' ? 'btn-success' : 'btn-outline-success'" class="btn" @click="exame.origem = 'Recebido'">Recebido</button>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputTipo">Tipo</label>
              <input type="text" class="form-control" id="inputTipo" v-model="exame.tipo">
            </div>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isEditting: this.$route.name == "NovoExame",
      isCreating: this.$route.name == "NovoExame"
    };
  },
  computed: {
    ...mapGetters({
      exame: "exames/exame",
      novo: "exames/new"
    })
  },
  methods: {
    ...mapActions({
      nova: "exames/new",
      create: "exames/create",
      getOne: "exames/getOne"
    }),
    enviar() {
      if (this.$route.name == "NovoExame") {
        this.exame.dia = new Date(
          this.exame.data + " " + this.exame.hora
        ).getTime();
        this.create(this.exame).then(res => {
          if (res.status == "OK") {
            alert("Exame marcado com sucesso!");
            this.$router.go(-1);
          }
        });
      }
    }
  },
  beforeDestroy() {
    this.nova();
  }
};
</script>
<style scoped>
input[type="radio"] {
  margin-left: 10px;
}
</style>
