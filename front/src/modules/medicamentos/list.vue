<template>
  <div class="container">
    <div class="list-group">
      <h2>
        Lista de medicamentos
        <router-link tag="small" to="medicamentos/novo" class="text-primary float-right">Adicionar</router-link>
      </h2>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Nome de fábrica</th>
          <th scope="col">Fabricante</th>
          <th scope="col" width="50">Deletar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in list" :key="m._id">
          <router-link tag="td" :to="'/medicamentos/' + m._id">{{ m.name }}</router-link>
          <router-link tag="td" :to="'/medicamentos/' + m._id">{{ m.fab }}</router-link>
          <router-link tag="td" :to="'/medicamentos/' + m._id">{{ m.nameFab }}</router-link>
          <td class="text-center" width="50">
            <i @click="canRemove(m._id, m.name)" class="fas fa-trash-alt text-danger"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
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
      list: "medicamentos/list",
      total: "medicamentos/total"
    })
  },
  methods: {
    ...mapActions({
      medList: "medicamentos/getList",
      remove: "medicamentos/remove"
    }),
    async updateList() {
      this.loading = true;
      await this.medList(this.$route.query);
      this.loading = false;
    },
    canRemove(id, name) {
      if (confirm("Tem certeza que deseja excluir " + name + "?")) {
        this.remove(id);
      }
    }
  },
  mounted() {
    this.medList(this.$route.query);
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

i {
  background-color: white;
  border-radius: 50%;
  transition: all 0.2s;
}
td {
  cursor: pointer;
}
</style>
