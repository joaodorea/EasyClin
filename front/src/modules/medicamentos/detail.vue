<template>
  <div
    class="modal d-block"
    id="modalAddMedicamento"
    role="dialog"
    tabindex="-1"
    aria-labelledby="addMedicamento"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addMedicamento">Atualizar medicamento</h5>
          <router-link tag="button" class="close" to="/medicamentos">
            <span aria-hidden="true">&times;</span>
          </router-link>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <div class="form-group">
              <label for="medicamentoNome">Nome do medicamento *</label>
              <input
                v-model="medicamento.name"
                type="text"
                class="form-control"
                id="medicamentoNome"
                aria-describedby="emailHelp"
              >
            </div>
            <div class="form-group">
              <label for="medicamentoNomeFabrica">Nome de fábrica *</label>
              <input
                v-model="medicamento.nameFab"
                type="text"
                class="form-control"
                id="medicamentoNomeFabrica"
              >
            </div>
            <div class="form-group">
              <label for="medicamentoFabricante">Fabricante *</label>
              <input
                v-model="medicamento.fab"
                type="text"
                class="form-control"
                id="medicamentoFabricante"
              >
            </div>
            <button id="submit" type="submit" hidden></button>
            <small class="text-muted">* Campos obrigatórios</small>
          </form>
        </div>
        <div class="modal-footer">
          <router-link to="/medicamentos" tag="button" type="button" class="btn btn-secondary">Close</router-link>
          <label for="submit" class="btn btn-primary m-0">Atualizar</label>
        </div>
      </div>
    </div>
    <router-link to="/medicamentos" tag="span" class="bg-black"></router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      nome: "",
      fab: "",
      nomeFab: ""
    };
  },
  computed: {
    ...mapGetters({
      medicamento: "medicamentos/getOne"
    })
  },
  methods: {
    ...mapActions({
      get: "medicamentos/getOne",
      new: "medicamentos/new",
      update: "medicamentos/update"
    }),
    save() {
      this.update(this.medicamento).then(resp => {
        if (resp.status == "OK") {
          alert("Consulta atualizada com sucesso!");
          this.$router.push("/medicamentos");
        }
      });
    }
  },
  created() {
    this.get(this.$route.params.id);
  },
  beforeDestroy() {
    this.new();
  }
};
</script>
