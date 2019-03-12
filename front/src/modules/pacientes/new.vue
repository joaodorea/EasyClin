<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <h2 :class="{invisible: !user.name}">{{ user.name || "Paciente" }}</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputEmail4"
                v-model="user.name"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">E-mail</label>
              <input
                :readonly="!isEditting"
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="user.email"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputCpf">CPF</label>
            <input
              :readonly="!isEditting"
              type="text"
              class="form-control"
              id="inputCpf"
              v-model="user.cpf"
            >
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAddress">Endereço</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="user.endereco"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2">Complemento</label>
              <input
                :readonly="!isEditting"
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
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputCidade"
                v-model="user.cidadeEstado"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone1">Telefone 1</label>
              <input
                :readonly="!isEditting"
                type="tel"
                class="form-control"
                id="inputTelefone1"
                v-model="user.telefone1"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Telefone 2</label>
              <input
                :readonly="!isEditting"
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
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputConvenio"
                v-model="user.convenio"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputConvenioCodigo">Código do convênio</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputConvenioCodigo"
                v-model="user.codigoConvenio"
              >
            </div>
          </div>
          <div class="form-row">
            <button type="submit" class="btn btn-primary ml-auto">Salvar</button>
            <button type="button" id="delete" @click="deletePaciente(user._id)" hidden></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isEditting: this.$route.name == "NovoPaciente",
      isCreating: this.$route.name == "NovoPaciente"
    };
  },
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
      if (this.isCreating) {
        delete this.user._id;
        this.add(this.user).then(res => {
          if (res.status == "OK") {
            alert("Paciente adicionado com sucesso.");
            this.$router.go(-1);
          }
        });
      } else {
        this.update(this.user).then(res => {
          if (res.status == "OK") {
            alert("Paciente atualizado com sucesso!");
          }
        });
      }
    },
    deletePaciente(id) {
      if (confirm("Tem certeza que deseja excluir esse paciente?")) {
        this.del(id).then(res => {
          if (res.status == "OK") {
            alert("Paciente deletado com sucesso!");
            this.$router.go(-1);
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "pacientes/getOne"
    })
  },
  created() {
    if (this.$route.params.id) {
      this.get(this.$route.params.id);
      this.user = this.paciente;
    } else {
      this.new();
    }
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
