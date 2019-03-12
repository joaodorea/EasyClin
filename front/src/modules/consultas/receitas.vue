<template>
  <div class="row mt-3">
    <div class="col-md-12">
      <h3>Receita</h3>
      <div class="accordion" id="receitas">
        <div v-for="(rec,i) in receitas" :key="rec._id">
          <div
            class="card-header"
            id="headingOne"
            data-toggle="collapse"
            :data-target="'#collapse' + i"
            aria-expanded="false"
            :aria-controls="'collapse' + i"
          >
            <h5 class="mb-0">
              <span>{{ rec.diaCadastro | moment("DD MMMM") }}</span>
            </h5>
          </div>

          <div
            :id="'collapse' + i"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#receitas"
          >
            <div class="card-body">
              <ul>
                <li v-for="m in rec.medicamentos" :key="m._id">
                  <span
                    :title="`${m.medicamento.nameFab} (${m.medicamento.fab})`"
                  >{{ m.medicamento.name }}</span>
                  -
                  <span class="text-muted">{{ m.descricao }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h4 class="mt-3">Adicionar novo</h4>
      <form @submit.prevent="newMed">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="medicamento">Medicamento</label>
            <select
              class="form-control"
              name="medicamento"
              id="medicamento"
              v-model="medicamento.medicamento"
            >
              <option disabled value>Selecione um medicamento</option>
              <option v-for="m in medicamentos" :value="m" :key="m._id">{{m.name}}</option>
            </select>
          </div>

          <div class="form-group col-md-12">
            <label for="frequencia">Descrição</label>

            <div class="input-group">
              <input
                id="frequencia"
                class="form-control"
                type="text"
                v-model="medicamento.descricao"
              >
              <div class="input-group-append">
                <button class="btn btn-primary">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-12" v-if="list.length > 0">
      <ul>
        <li v-for="(r, i) in list" :key="r.medicamento._id">
          {{ r.medicamento.name }} -
          <small>{{ r.descricao }}</small>
          <span class="ml-3" @click="list.splice(i, 1)">
            <i class="fa fa-trash"></i>
          </span>
        </li>
      </ul>
      <button @click="save" type="button" class="btn btn-success">Salvar Receita</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      list: [],
      medicamento: {}
    };
  },
  props: [
    "paciente"
  ],
  methods: {
    ...mapActions({
      getMedicamentos: "medicamentos/getList",
      create: "receitas/createReceita",
      getList: "receitas/getListReceitas"
    }),
    newMed() {
      if(!this.medicamento.medicamento) {
        alert("Selecione um medicamento antes.")
        return;
      }
      let isAdded = this.list.find(
        m => m.medicamento._id == this.medicamento.medicamento._id
      );
      if (!isAdded) {
        this.list.push(this.medicamento);
      } else {
        alert(`${this.medicamento.medicamento.name} já adicionado.`);
      }
      this.medicamento = {};
    },
    save() {
      this.create({
        medicamentos: this.list,
        consulta: this.$route.params.id,
        paciente: this.paciente._id
      }).then(resp => {
        if (resp.status == 200) {
          this.getList(this.$route.params.id);
          alert("Receita cadastrada com sucesso!");
          this.list = [];
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      medicamentos: "medicamentos/list",
      receitas: "receitas/list"
    })
  },
  created() {
    this.getMedicamentos();
    this.getList(this.$route.params.id);
  }
};
</script>

<style scoped>
.form-row {
  align-items: flex-end;
}
.card-header {
  cursor: pointer;
}
</style>
