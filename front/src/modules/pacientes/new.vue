<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <h2 :class="{invisible: !user.name}">{{ user.name || "Paciente" }}</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome *</label>
              <input required type="text" class="form-control" id="inputEmail4" v-model="user.name">
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">E-mail *</label>
              <input
                required
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="user.email"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputCpf">RG / CPF *</label>
            <input
              v-mask="['###.###.###-##']"
              type="text"
              class="form-control"
              id="inputCpf"
              v-model="user.cpf"
            >
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAddress">Endereço *</label>
              <input
                required
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="user.endereco"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2">Complemento</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                v-model="user.enderecoComp"
              >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCidade">Cidade/estado</label>
              <input type="text" class="form-control" id="inputCidade" v-model="user.cidadeEstado">
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone1">Telefone *</label>
              <input
                v-mask="['(##) ####-####', '(##) #####-####']"
                type="tel"
                class="form-control"
                id="inputTelefone1"
                v-model="user.telefone1"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Telefone responsável</label>
              <input
                v-mask="['(##) ####-####', '(##) #####-####']"
                type="tel"
                class="form-control"
                id="inputTelefone2"
                v-model="user.telefone2"
              >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputConvenio">Convênio</label>
              <input type="text" class="form-control" id="inputConvenio" v-model="user.convenio">
            </div>
            <div class="form-group col-md-6">
              <label for="inputConvenioCodigo">Código do convênio</label>
              <input
                type="text"
                class="form-control"
                id="inputConvenioCodigo"
                v-model="user.codigoConvenio"
              >
            </div>
          </div>
          <div class="form-row">
            <small class="text-muted">* Campos obrigatórios</small>
            <button type="submit" class="btn btn-primary ml-auto">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { mask } from "vue-the-mask";
export default {
  data() {
    return {
      user: {}
    };
  },
  directives: { mask },
  methods: {
    ...mapActions({
      get: "pacientes/getOne",
      add: "pacientes/add",
      del: "pacientes/delete",
      update: "pacientes/update"
    }),
    ...mapMutations({
      new: "pacientes/new"
    }),
    enviar() {
      this.add(this.user)
        .then(res => {
          if (res.status == "OK") {
            alert("Paciente adicionado com sucesso.");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log("catch:" + err);
        });
    }
  },
  created() {
    this.new();
  },
  beforeDestroy() {
    this.new();
  }
};
</script>
<style lang="scss" scoped>
.exames-list {
  cursor: pointer;
}
</style>
