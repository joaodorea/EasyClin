<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="list-group">
                <h2>Lista de funcionários <router-link class="text-primary float-right" tag="span" to="pacientes/novo"> Adicionar</router-link></h2>
                <router-link class="list-group-item list-group-item-action flex-column align-items-start"
                    v-for="f in list"
                    :key="f.id"
                    :to="`pacientes/${f.id}`">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ f.name }}</h5>
                    <small>{{ f.cargo }}</small>
                    </div>
                    <p class="mb-1">{{ f.clinica }} - {{ f.codigoConvenio }}</p>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      list: this.$store.getters.funcionariosList
    };
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
