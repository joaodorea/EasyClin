<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <router-link class="navbar-brand" to="/">Clinic Manager</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isAuth">
          <router-link active-class="active" class="nav-link" to="/" exact>Home</router-link>
        </li>
        <li class="nav-item" v-if="isAuth && isAdmin">
          <router-link active-class="active" class="nav-link" to="/medicamentos">Medicamentos</router-link>
        </li>
        <li class="nav-item" v-if="isAuth">
          <router-link active-class="active" class="nav-link" to="/pacientes">Pacientes</router-link>
        </li>
        <li class="nav-item" v-if="isAuth && isAdmin">
          <router-link active-class="active" class="nav-link" to="/funcionarios">Funcionários</router-link>
        </li>
        <li class="nav-item" v-if="isAuth">
          <router-link active-class="active" class="nav-link" to="/exames">Exames</router-link>
        </li>
        <li class="nav-item" v-if="isAuth">
          <router-link active-class="active" class="nav-link" to="/consultas">Consultas</router-link>
        </li>
        <li class="nav-item" v-if="!isAuth">
          <router-link active-class="active" class="nav-link" to="/login" exact>Login</router-link>
        </li>
        <li class="nav-item" v-if="isAuth">
          <div class="dropdown">
            <a
              class="dropdown-toggle nav-link"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              <router-link to="/minha-conta" class="dropdown-item">Minha conta</router-link>
              <a class="dropdown-item" @click="logoutFunc">Sair</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    activeItem: 0
  }),
  computed: {
    ...mapGetters({
      isAuth: "account/isAuth",
      user: "account/user"
    }),
    isAdmin() {
      if (this.user) return this.user.profile == "Administrador";
    }
  },
  methods: {
    openSidebar() {
      this.$store.commit("openSidebar");
    },
    ...mapMutations({
      logout: "account/logout"
    }),
    logoutFunc() {
      if (confirm("Tem certeza que você deseja sair?")) {
        this.logout();
        this.$router.push("/login");
      }
    }
  }
};
</script>