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
        <div class="modal-body">
          <form @submit.prevent="create">
            <div class="form-group">
              <label for="medicamentoNome">Nome do medicamento</label>
              <input
                v-model="nome"
                type="text"
                class="form-control"
                id="medicamentoNome"
                aria-describedby="emailHelp"
              >
            </div>
            <div class="form-group">
              <label for="medicamentoNomeFabrica">Nome de fábrica</label>
              <input v-model="nomeFab" type="text" class="form-control" id="medicamentoNomeFabrica">
            </div>
            <div class="form-group">
              <label for="medicamentoFabricante">Fabricante</label>
              <input v-model="fab" type="text" class="form-control" id="medicamentoFabricante">
            </div>
            <button id="submit" type="submit" hidden></button>
          </form>
        </div>
        <div class="modal-footer">
          <router-link to="/medicamentos" tag="button" type="button" class="btn btn-secondary">Close</router-link>
          <label for="submit" class="btn btn-primary m-0">Adicionar</label>
        </div>
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
      nome: "",
      fab: "",
      nomeFab: ""
    };
  },
  methods: {
    create() {
      this.send({
        name: this.nome,
        fab: this.fab,
        nameFab: this.nomeFab
      });
    },
    ...mapActions({
      send: "medicamentos/create"
    })
  }
};
</script>
