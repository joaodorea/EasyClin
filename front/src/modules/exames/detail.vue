<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto">
        <form @submit.prevent="enviar">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPaciente">Paciente</label>
              <h4 v-if="!isEditting">{{ exame.paciente.name }} <router-link tag="small" class="ml-5" :to="'/pacientes/' + exame.paciente._id"><i class="fas fa-external-link-alt"></i></router-link></h4>
              <select v-else
                id="inputPaciente"
                :disabled="!isEditting"
                class="form-control"
                v-model="exame.paciente"
              >
                <option disabled value>Selecione um paciente</option>
                <option v-for="p in novo.pacientes" :value="p._id" :key="p._id">{{p.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputName">Nome</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputName"
                v-model="exame.name"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputLocal">Local</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputLocal"
                v-model="exame.local"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Descrição</label>
            <textarea
              :readonly="!isEditting"
              name
              id
              class="form-control"
              cols="5"
              rows="3"
              v-model="exame.desc"
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputorigem">Origem:</label>
              <br>
              <label for="inputOrigemEmitido">
                <input
                  :disabled="!isEditting"
                  type="radio"
                  id="inputOrigemEmitido"
                  v-model="exame.origem"
                  value="Emitido"
                > Emitido
              </label>
              <label for="inputOrigemRecebido">
                <input
                  :disabled="!isEditting"
                  type="radio"
                  id="inputOrigemRecebido"
                  v-model="exame.origem"
                  value="Recebido"
                > Recebido
              </label>
            </div>
            <div class="form-group col-md-6">
              <label for="inputTipo">Tipo</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputTipo"
                v-model="exame.tipo"
              >
            </div>
          </div>
          <div v-if="isEditting" class="form-row">
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
    })
  },
  methods: {
    ...mapActions({
      nova: "exames/new",
      create: "exames/create",
      getOne: "exames/getOne",
    }),
    enviar() {
      if (this.$route.name == "NovoExame") {
        this.create(this.exame);
      }
    }
  },
  created() {
    this.getOne(this.$route.params.id)
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
h4 small {
  cursor: pointer;
}
</style>
