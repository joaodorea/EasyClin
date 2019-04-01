<template>
  <div class="container">
    <div class="list-group">
      <h2>
        Consultas
        <router-link
          v-if="!isMedico"
          tag="small"
          to="consultas/nova"
          class="text-primary float-right"
          data-target="#modalAddConsulta"
          data-toggle="modal"
        >Marcar nova</router-link>
      </h2>
      <div class="accordion" id="consultasAccordion">
        <table class="consultas table table-hover">
          <thead>
            <tr>
              <th scope="col">Médico</th>
              <th scope="col">Paciente</th>
              <th scope="col">Dia</th>
              <th scope="col">Horário</th>
            </tr>
          </thead>
          <tbody>
            <router-link tag="tr" v-for="c in list" :key="c.id" :to="'consultas/' + c._id">
              <td scope="row">{{ c.medico.name }}</td>
              <td>{{ c.paciente.name }}</td>
              <td>{{ c.dia }}</td>
              <td>{{ c.hora }}</td>
            </router-link>
          </tbody>
        </table>
      </div>
    </div>
    <my-pagination @clicked="updateList" :total="total"></my-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      list: "consultas/list",
      total: "consultas/total",
      user: "account/user"
    }),
    isMedico() {
      return this.user.profile == "Médico";
    }
  },
  methods: {
    ...mapActions({
      getList: "consultas/getList"
    }),
    async updateList() {
      this.loading = true;
      await this.getList(this.$route.query);
      this.loading = false;
    }
  },
  mounted() {
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
.consultas {
  tbody tr {
    cursor: pointer;
  }
}
</style>