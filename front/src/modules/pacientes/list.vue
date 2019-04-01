<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="list-group">
          <h2>
            Lista de pacientes
            <router-link
              v-if="!isMedico"
              class="text-primary float-right"
              tag="small"
              to="pacientes/novo"
            >Adicionar</router-link>
          </h2>
          <router-link
            class="list-group-item list-group-item-action flex-column align-items-start"
            v-for="p in list"
            :key="p.id"
            :to="`pacientes/${p._id}`"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ p.name }}</h5>
              <small>{{ p.cpf }}</small>
            </div>
            <p class="mb-1">{{ p.convenio }} - {{ p.codigoConvenio }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <my-pagination @clicked="updateList" :total="total"></my-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import myPagination from "./../shared/Pagination.vue";

export default {
  data() {
    return {};
  },
  components: {
    myPagination
  },
  computed: {
    ...mapGetters({
      list: "pacientes/list",
      total: "pacientes/total",
      user: "account/user"
    }),
    isMedico() {
      return this.user.profile == "Médico";
    }
  },
  methods: {
    ...mapActions({
      pacList: "pacientes/setList"
    }),
    async updateList() {
      this.loading = true;
      await this.pacList(this.$route.query);
      this.loading = false;
    }
  },
  mounted() {
    this.pacList(this.$route.query);
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
