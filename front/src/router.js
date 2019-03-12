import Vue from "vue";
import Router from "vue-router";
import store from "./store/index";
import guard from "./router/guard";

import Home from "./modules/shared/Home.vue";
import Login from "./modules/shared/Login.vue";
import Register from "./modules/shared/Register.vue";
import Medicamentos from "./modules/medicamentos/home.vue";
import Pacientes from './modules/pacientes/home.vue';
import Funcionarios from './modules/funcionarios/home.vue';
import Exames from './modules/exames/home.vue';
import Consultas from './modules/consultas/home.vue';

import PacientesList from './modules/pacientes/list.vue';
import PacienteNew from './modules/pacientes/new.vue';
import PacienteDetail from './modules/pacientes/detail.vue';

import ExamesList from './modules/exames/list.vue';
import ExameDetail from './modules/exames/detail.vue';
import ExameNew from './modules/exames/new.vue';

import ConsultasList from './modules/consultas/list.vue';
import ConsultaDetail from './modules/consultas/detail.vue';
import ConsultaNew from './modules/consultas/new.vue';

import MedicamentoDetail from './modules/medicamentos/detail.vue';
import MedicamentoNew from './modules/medicamentos/new.vue';

import MinhaConta from './modules/account/home.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/pacientes",
      component: Pacientes,
      beforeEnter: guard,
      children: [
        {
          path: "",
          name: "pacientes",
          component: PacientesList
        },
        {
          path: "novo",
          component: PacienteNew,
          name: 'NovoPaciente'
        },
        {
          path: ":id",
          component: PacienteDetail
        }
      ]
    },
    {
      path: "/medicamentos",
      component: Medicamentos,
      beforeEnter: guard,
      children: [
        {
          path: "novo",
          component: MedicamentoNew,
          name: 'NovoMedicamento'
        },
        {
          path: ":id",
          component: MedicamentoDetail
        }
      ]
    },
    {
      path: "/funcionarios",
      name: "funcionarios",
      beforeEnter: guard,
      component: Funcionarios
    },
    {
      path: "/exames",
      component: Exames,
      beforeEnter: guard,
      children: [
        {
          path: "",
          name: "exames",
          component: ExamesList
        },
        {
          path: "novo",
          component: ExameNew,
          name: 'NovoExame'
        },
        {
          path: ":id",
          component: ExameDetail
        }
      ]
    },
    {
      path: "/consultas",
      component: Consultas,
      beforeEnter: guard,
      children: [
        {
          path: "",
          name: "consultas",
          component: ConsultasList
        },
        {
          path: "nova",
          component: ConsultaNew,
          name: 'NovoConsulta'
        },
        {
          path: ":id",
          component: ConsultaDetail
        }
      ]
    },
    {
      path: "/minha-conta",
      component: MinhaConta,
      beforeEnter: guard,
    },
  ]
});

router.beforeEach = (to, from, next) => {
  let account = store.state.account;
  if (!account.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export default router;