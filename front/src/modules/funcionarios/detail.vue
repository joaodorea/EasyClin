<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <h2 :class="{invisible: !funcionario.name}">{{ funcionario.name || "Funcionário" }}</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome *</label>
              <input
                required
                type="text"
                class="form-control"
                id="inputEmail4"
                v-model="funcionario.name"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">E-mail *</label>
              <input
                required
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="funcionario.email"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputCpf">CPF *</label>
            <input
              required
              v-mask="['###.###.###-##']"
              type="text"
              class="form-control"
              id="inputCpf"
              v-model="funcionario.cpf"
            >
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAddress">Endereço</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="funcionario.address"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2">Complemento</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                v-model="funcionario.addressComp"
              >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCidade">Cidade/estado</label>
              <input
                type="text"
                class="form-control"
                id="inputCidade"
                v-model="funcionario.cityState"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone1">Telefone 1 *</label>
              <input
                required
                v-mask="['(##) ####-####', '(##) #####-####']"
                type="tel"
                class="form-control"
                id="inputTelefone1"
                v-model="funcionario.phone1"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Telefone 2</label>
              <input
                v-mask="['(##) ####-####', '(##) #####-####']"
                type="tel"
                class="form-control"
                id="inputTelefone2"
                v-model="funcionario.phone2"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone1">Função *</label>
              <select
                required
                v-model="funcionario.profile"
                class="form-control"
                name="profile"
                id="profile"
              >
                <option value="Editor">Editor</option>
                <option value="Administrador">Administrador</option>
                <option value="Médico">Médico</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Área *</label>
              <input
                required
                v-model="funcionario.profileArea"
                class="form-control"
                type="text"
                name="profileArea"
                id="profileArea"
              >
            </div>
            <div class="form-group col-md-6 align-self-end">
              <h4 v-if="funcionario.hasAccount">Esse usuário tem uma conta</h4>
            </div>
          </div>
          <div class="form-row mb-3">
            <small class="text-muted">* Campos obrigatórios</small>
          </div>
          <div class="form-row">
            <button
              class="btn btn-outline-danger"
              @click="deleteFuncionario"
              type="button"
              id="delete"
            >Deletar</button>
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
      funcionario: {}
    };
  },
  directives: { mask },
  methods: {
    ...mapActions({
      get: "funcionarios/getOne",
      update: "funcionarios/update",
      remove: "funcionarios/remove"
    }),
    enviar() {
      this.update(this.funcionario).then(res => {
        if (res.status == "OK") {
          alert("Paciente atualizado com sucesso!");
          this.$router.go(-1);
        }
      });
    },
    deleteFuncionario() {
      if (confirm("Tem certeza que deseja deletar esse funcionário?")) {
        this.remove(this.$route.params.id).then(res => {
          if (res.status == "OK") {
            alert("Paciente removido com sucesso!");
            this.$router.go(-1);
          }
        });
      }
    }
  },
  created() {
    this.get(this.$route.params.id).then(resp => {
      this.funcionario = resp;
    });
  }
};
</script>
<style lang="scss" scoped>
.exames-list {
  cursor: pointer;
}
</style>
