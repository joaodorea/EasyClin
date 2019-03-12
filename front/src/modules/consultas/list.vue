<template>
  <div class="container">
    <div class="list-group">
      <h2>Consultas
        <router-link
          tag="small"
          to="consultas/nova"
          class="text-primary float-right"
          data-target="#modalAddConsulta"
          data-toggle="modal"
        >Marcar nova</router-link>
      </h2>
      <div class="accordion" id="consultasAccordion">
        <!-- <div v-for="c in list" :key="c.id" class="card">
            <div class="card-header" :id="c._id"  data-toggle="collapse" :data-target="'#collapse' + c._id" aria-expanded="true" :aria-controls="'collapse' + c._id"  title="Clique para expandir">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><small>Paciente:</small> {{ c.paciente.name }}</h5>
                <h6>{{ c.dia }}</h6>
              </div>
              <div class="d-flex w-100 justify-content-between">
                <p class="mb-1"><small>Médico:</small> {{ c.medico.name }}</p>
                <small>{{ c.hora }}</small>
              </div>
            </div>
            <div :id="'collapse' + c._id" class="collapse" :aria-labelledby="c._id" data-parent="#consultasAccordion">
              <div class="card-body">
                <h4>{{ c.local }}</h4>
                <p>{{ c.desc }}</p>
                <router-link tag="small" :to="'consultas/' + c._id" class="btn btn-outline-secondary btn-sm">Editar</router-link>
              </div>
            </div>
        </div>-->
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "consultas/list"
    })
  },
  methods: {
    ...mapActions({
      getList: "consultas/getList"
    })
  },
  mounted() {
    this.getList();
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