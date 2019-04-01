<template>
  <div class="container">
    <div class="list-group">
      <h2>
        Lista de exames
        <router-link tag="small" to="/exames/novo" class="text-primary float-right">Adicionar</router-link>
      </h2>
      <router-link
        :class="{loading}"
        :to="'/exames/'+e._id"
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="e in list"
        :key="e._id"
      >
        <p class="mb-1">
          <span class="text-muted">[{{ e.tipo }}]</span>
          {{ e.paciente.name }}
          <span class="float-right">{{ e.dia | moment('DD MMM') }}</span>
        </p>
      </router-link>
    </div>
    <hr>
    <my-pagination @clicked="updateList" :total="total"></my-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import myPagination from "./../shared/Pagination.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    myPagination
  },
  methods: {
    ...mapActions({
      getList: "exames/getList"
    }),
    async updateList() {
      this.loading = true;
      await this.getList(this.$route.query);
      this.loading = false;
    }
  },
  created() {
    this.getList(this.$route.query);
  },
  computed: {
    ...mapGetters({
      list: "exames/list",
      total: "exames/total"
    })
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
.loading {
  opacity: 0.3;
}
</style>
