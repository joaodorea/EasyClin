<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="list-group">
                <h2>Lista de pacientes <router-link class="text-primary float-right" tag="small" to="pacientes/novo"> Adicionar</router-link></h2>
                <router-link class="list-group-item list-group-item-action flex-column align-items-start"
                    v-for="p in list"
                    :key="p.id"
                    :to="`pacientes/${p._id}`">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ p.name }}</h5>
                    <small>{{ p.cpf }}</small>
                    </div>
                    <p class="mb-1">{{ p.convenio }} - {{ p.codigoConvenio }}</p>
                </router-link>
            </div>
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
      list: "pacientes/list"
    })
  },
  methods: {
    ...mapActions({
      pacList: "pacientes/setList"
    })
  },
  mounted() {
    this.pacList();
  }
};
</script>
<style scoped lang="scss">
h2 small {
  font-size: 0.6em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
