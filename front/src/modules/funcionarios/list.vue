<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="list-group">
          <h2>
            Lista de funcionários
            <router-link
              class="text-primary float-right"
              tag="small"
              to="funcionarios/novo"
            >Adicionar</router-link>
          </h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Função</th>
                <th scope="col">Area</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in list" :key="f.id">
                <router-link :to="`funcionarios/${f._id}`" tag="td" scope="row">{{ f.name }}</router-link>
                <router-link :to="`funcionarios/${f._id}`" tag="td">{{ f.profile }}</router-link>
                <router-link :to="`funcionarios/${f._id}`" tag="td">{{ f.profileArea }}</router-link>
              </tr>
            </tbody>
          </table>
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
  methods: {
    ...mapActions({
      getList: "funcionarios/getList"
    }),
    async updateList() {
      this.loading = true;
      await this.getList(this.$route.query);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters({
      list: "funcionarios/list",
      total: "funcionarios/total"
    })
  },
  created() {
    this.getList(this.$route.query);
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
td {
  cursor: pointer;
}
</style>
