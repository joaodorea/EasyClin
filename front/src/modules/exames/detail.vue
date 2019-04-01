<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto">
        <form @submit.prevent="enviar">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPaciente">Paciente *</label>
              <h4>
                {{ exame.paciente.name }}
                <router-link tag="small" class="ml-5" :to="'/pacientes/' + exame.paciente._id">
                  <i class="fas fa-external-link-alt"></i>
                </router-link>
              </h4>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputName">Nome</label>
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
              <h4>{{ exame.origem }}</h4>
            </div>
            <div class="form-group col-md-6">
              <label for="inputTipo">Tipo</label>
              <input type="text" class="form-control" id="inputTipo" v-model="exame.tipo">
            </div>
          </div>
          <div class="form-row">
            <button @click="deleteExam" type="button" class="btn btn-outline-danger">Deletar</button>
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
    return {};
  },
  computed: {
    ...mapGetters({
      exame: "exames/exame"
    })
  },
  methods: {
    ...mapActions({
      nova: "exames/new",
      remove: "exames/remove",
      getOne: "exames/getOne",
      update: "exames/update"
    }),
    deleteExam() {
      if (confirm("Você tem certeza que quer remover esse exame?")) {
        this.remove(this.$route.params.id).then(res => {
          if (res.status == "OK") {
            alert("Exame removido com sucesso");
          }
          this.$router.push("/exames");
        });
      }
    },
    enviar() {
      this.update(this.exame).then(res => {
        if (res.status == "OK") {
          alert("Exame atualizado com sucesso!");
        }
      });
    }
  },
  created() {
    this.getOne(this.$route.params.id);
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
