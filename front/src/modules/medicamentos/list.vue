<template>
  <div class="container">
    <div class="list-group">
      <h2>Lista de medicamentos
        <router-link tag="small" to="medicamentos/novo" class="text-primary float-right">Adicionar</router-link>
      </h2>
      <!-- <router-link
        tag="a"
        :to="'/medicamentos/' + m._id"
        href="#"
        class="list-group-item list-group-item-action d-flex"
        v-for="m in list"
        :key="m._id"
      >
        <h5 class="flex-fill">{{ m.name }}</h5>
        <small>({{ m.fab }})</small>
        <p>{{ m.nameFab }}</p>
        <i @click="canRemove(m._id, m.name)" class="fas fa-trash-alt text-danger"></i>
      </router-link> -->
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Nome de fábrica</th>
          <th scope="col">Fabricante</th>
          <th scope="col" width="50">remove</th>
        </tr>
      </thead>
      <tbody>
        <router-link tag="tr" v-for="m in list" :key="m._id" :to="'/medicamentos/' + m._id">
          <td>{{ m.name }}</td>
          <td>{{ m.fab }}</td>
          <td>{{ m.nameFab }}</td>
          <td class="text-center" width="50"><i @click="canRemove(m._id, m.name)" class="fas fa-trash-alt text-danger"></i></td>
        </router-link>
      </tbody>
    </table>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      list: "medicamentos/list"
    })
  },
  methods: {
    ...mapActions({
      medList: "medicamentos/getList",
      remove: "medicamentos/remove"
    }),
    canRemove(id, name) {
      if (confirm("Tem certeza que deseja excluir " + name + "?")) {
        this.remove(id);
      }
    }
  },
  mounted() {
    this.medList();
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
<style scoped>

i {
  background-color: white;
  border-radius: 50%;
  transition: all 0.2s;
  /* padding: 10px; */
  /* right: -30px; */
  /* position: absolute; */
}
</style>
