<template>
  <div class="container pb-5">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <h2 :class="{invisible: !user.paciente.name}">{{ user.paciente.name || "Paciente" }}</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome *</label>
              <input
                required
                :readonly="!isEditting"
                type="text"
                class="form-control"
                id="inputEmail4"
                v-model="user.paciente.name"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail">E-mail *</label>
              <input
                :readonly="!isEditting"
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="user.paciente.email"
              >
            </div>
          </div>
          <div class="form-row">
            <div
              class="form-group col-md-6"
              title="Não é possível modificar o cpf depois de cadastrado"
            >
              <label for="inputCpf">RG / CPF *</label>
              <input
                required
                v-mask="['###.###.###-##']"
                readonly
                type="text"
                class="form-control"
                id="inputCpf"
                v-model="user.paciente.cpf"
              >
            </div>
            <div class="form-group col-md-6">
              <label for="inputSexo">Sexo</label>
              <select
                class="form-control"
                v-model="user.paciente.sexo"
                name="inputSexo"
                id="inputSexo"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAddress">Endereço *</label>
              <input
                required
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
              <label for="inputTelefone1">Telefone *</label>
              <input
                required
                v-mask="['(##) ####-####', '(##) #####-####']"
                :readonly="!isEditting"
                type="tel"
                class="form-control"
                id="inputTelefone1"
                v-model="user.paciente.telefone1"
              >
            </div>
            <div class="form-group col-md-3">
              <label for="inputTelefone2">Telefone responsável</label>
              <input
                v-mask="['(##) ####-####', '(##) #####-####']"
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
              <textarea
                v-model="user.paciente.historicoClinico"
                class="form-control"
                id="inputHistClinico"
                cols="5"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div class="form-row">
            <small class="text-muted mb-3">* Campos obrigatórios</small>
          </div>
          <div class="form-row">
            <button
              type="button"
              id="delete"
              class="btn btn-outline-danger"
              @click="deletePaciente(user.paciente._id)"
            >Deletar</button>
            <button type="submit" class="btn btn-primary ml-auto">Salvar</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="user.consultas.length" class="row mt-5">
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
          <ul class="list-group mb-3" v-for="receita in user.receitas" :key="receita._id">
            <h5>{{ receita.diaCadastro | moment("DD MMMM") }}</h5>
            <li>
              {{ receita.medicamento.name }} -
              <small class="text-muted">{{ receita.descricao }}</small>
            </li>
          </ul>
        </div>
        <p v-else>Nenhuma médicamento</p>
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
      isEditting: true,
      pac: {}
    };
  },
  directives: { mask },
  methods: {
    ...mapActions({
      get: "pacientes/getOne",
      del: "pacientes/delete",
      update: "pacientes/update"
    }),
    ...mapMutations({
      new: "pacientes/new"
    }),
    enviar() {
      this.update(this.user.paciente).then(res => {
        if (res.status == "OK") {
          alert("Paciente atualizado com sucesso!");
        }
      });
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
#inputCpf {
  cursor: not-allowed;
}
</style>
