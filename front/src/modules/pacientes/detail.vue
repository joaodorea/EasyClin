<template>
  <div class="container pb-5">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <h2 :class="{invisible: !user.paciente.name}">{{ user.paciente.name || "Paciente" }}</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputEmail4"
                v-model="user.paciente.name"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">E-mail</label>
              <input
                :readonly="!isEditting"
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="user.paciente.email"
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
              v-model="user.paciente.cpf"
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
                v-model="user.paciente.endereco"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2">Complemento</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputAddress2"
                v-model="user.paciente.enderecoComp"
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
                v-model="user.paciente.cidadeEstado"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone1">Telefone 1</label>
              <input
                :readonly="!isEditting"
                type="tel"
                class="form-control"
                id="inputTelefone1"
                v-model="user.paciente.telefone1"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Telefone 2</label>
              <input
                :readonly="!isEditting"
                type="tel"
                class="form-control"
                id="inputTelefone2"
                v-model="user.paciente.telefone2"
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
                v-model="user.paciente.convenio"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputConvenioCodigo">Código do convênio</label>
              <input
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputConvenioCodigo"
                v-model="user.paciente.codigoConvenio"
              >
            </div>
            <div class="form-group col-md-12">
              <label for="inputHistClinico">Histórico Clinico</label>
              <textarea class="form-control" id="inputHistClinico" cols="5" rows="3"></textarea>
            </div>
          </div>
          <div class="form-row">
            <button type="submit" class="btn btn-primary ml-auto">Salvar</button>
            <button type="button" id="delete" @click="deletePaciente(user.paciente._id)" hidden></button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="user.consultas.length" class="row mt-3">
      <div class="col-md-12 mb-3">
        <h3>Históricos:</h3>
      </div>
      <div class="col-md-4">
        <h4>Consultas</h4>
        <ul class="list-group">
          <router-link
            tag="li"
            :to="'/consultas/' + c._id"
            :key="c._id"
            v-for="c in user.consultas"
            class="list-group-item exames-list"
          >
            {{ c.name }}
            <span class="float-right">{{ consultaDate(c.dia) }}</span>
          </router-link>
        </ul>
      </div>
      <div class="col-md-4">
        <h4>Exames</h4>
        <ul class="list-group">
          <router-link
            tag="li"
            :to="'/exames/' + e._id"
            :key="e._id"
            v-for="e in user.exames"
            class="list-group-item exames-list"
          >
            {{ e.name }}
            <span class="float-right">{{ e.dia | moment('DD MMM') }}</span>
          </router-link>
        </ul>
      </div>
      <div class="col-md-4">
        <h4>Medicamentos</h4>
        <div v-if="user.receitas.length">
          <ul class="list-group mb-3"
              v-for="receita in user.receitas"
              :key="receita._id">
              {{ receita.diaCadastro | moment("DD MMMM") }}
            <li
              :key="r._id"
              v-for="r in receita.medicamentos"
              class="list-group-item"
            >{{ r.medicamento.name }} - <small class="text-muted">{{ r.descricao }}</small></li>
          </ul>
        </div>
        <p v-else>Nenhuma médicamento</p>
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
      isCreating: this.$route.name == "NovoPaciente",
      pac: {}
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
    },
    consultaDate(dia) {
      return this.$moment(dia, "DD/MM").format("DD MMM");
    }
  },
  computed: {
    ...mapGetters({
      user: "pacientes/getOne"
    })
  },
  mounted() {
    this.get(this.$route.params.id);
    this.pac = this.paciente;
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
