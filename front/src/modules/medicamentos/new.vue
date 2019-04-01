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
          <h5 class="modal-title" id="addMedicamento">Adicionar novo medicamento</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <router-link to="/medicamentos" tag="span">&times;</router-link>
          </button>
        </div>
        <form @submit.prevent="create(med)">
          <div class="modal-body">
            <div class="form-group">
              <label for="medicamentoNome">Nome do medicamento *</label>
              <input
                v-model="med.name"
                required
                type="text"
                class="form-control"
                id="medicamentoNome"
              >
            </div>
            <div class="form-group">
              <label for="medicamentoNomeFabrica">Nome de fábrica *</label>
              <input
                v-model="med.nameFab"
                type="text"
                class="form-control"
                id="medicamentoNomeFabrica"
                required
              >
            </div>
            <div class="form-group">
              <label for="medicamentoFabricante">Fabricante *</label>
              <input
                v-model="med.fab"
                required
                type="text"
                class="form-control"
                id="medicamentoFabricante"
              >
            </div>
            <small class="text-muted">* Campos obrigatórios</small>
          </div>
          <div class="modal-footer">
            <router-link
              to="/medicamentos"
              tag="button"
              type="button"
              class="btn btn-secondary"
            >Close</router-link>
            <button type="submit" class="btn btn-primary m-0">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
    <router-link to="/medicamentos" tag="span" class="bg-black"></router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      med: {
        name: "",
        fab: "",
        nameFab: ""
      }
    };
  },
  methods: {
    create(medi) {
      this.send({ ...medi })
        .then(res => {
          if (res._id) {
            alert("Medicamento adicionado com sucesso!");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions({
      send: "medicamentos/create"
    }),
    triggerSubmit() {
      document.getElementById("submitButton").click();
    }
  }
};
</script>
