import Vue from "vue";
import Router from "vue-router";
import store from "./store/index";
import { guard, isAdmin, common } from "./router/guard";

import Home from "./modules/shared/Home.vue";
import Login from "./modules/shared/Login.vue";
import Register from "./modules/shared/Register.vue";
import ForgetPassword from "./modules/shared/ForgetPassword.vue";
import Medicamentos from "./modules/medicamentos/home.vue";
import Pacientes from "./modules/pacientes/home.vue";
import Funcionarios from "./modules/funcionarios/home.vue";
import Exames from "./modules/exames/home.vue";
import Consultas from "./modules/consultas/home.vue";

import PacientesList from "./modules/pacientes/list.vue";
import PacienteNew from "./modules/pacientes/new.vue";
import PacienteDetail from "./modules/pacientes/detail.vue";

import ExamesList from "./modules/exames/list.vue";
import ExameDetail from "./modules/exames/detail.vue";
import ExameNew from "./modules/exames/new.vue";

import ConsultasList from "./modules/consultas/list.vue";
import ConsultaDetail from "./modules/consultas/detail.vue";
import ConsultaNew from "./modules/consultas/new.vue";

import MedicamentoDetail from "./modules/medicamentos/detail.vue";
import MedicamentoNew from "./modules/medicamentos/new.vue";

import FuncionariosList from "./modules/funcionarios/list.vue";
import FuncionarioNew from "./modules/funcionarios/new.vue";
import FuncionarioDetail from "./modules/funcionarios/detail.vue";

import MinhaConta from "./modules/account/home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: common
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: async (to, from, next) => {
        const isGuarded = await guard();
        if (isGuarded) next("/");
        else next();
      },
      component: Login
    },
    {
      path: "/recuperar-senha",
      name: "recuperar-senha",
      beforeEnter: async (to, from, next) => {
        const isGuarded = await guard();
        if (isGuarded) next("/");
        else next();
      },
      component: ForgetPassword
    },
    {
      path: "/register",
      name: "register",
      beforeEnter: isAdmin,
      component: Register
    },
    {
      path: "/pacientes",
      component: Pacientes,
      beforeEnter: common,
      children: [
        {
          path: "",
          name: "pacientes",
          component: PacientesList
        },
        {
          path: "novo",
          component: PacienteNew,
          name: "NovoPaciente"
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
      beforeEnter: isAdmin,
      children: [
        {
          path: "novo",
          component: MedicamentoNew,
          name: "NovoMedicamento"
        },
        {
          path: ":id",
          component: MedicamentoDetail
        }
      ]
    },
    {
      path: "/funcionarios",
      component: Funcionarios,
      beforeEnter: isAdmin,
      children: [
        {
          path: "",
          name: "funcionarios",
          component: FuncionariosList
        },
        {
          path: "novo",
          component: FuncionarioNew,
          name: "NovoFuncionario"
        },
        {
          path: ":id",
          component: FuncionarioDetail
        }
      ]
    },
    {
      path: "/exames",
      component: Exames,
      beforeEnter: common,
      children: [
        {
          path: "",
          name: "exames",
          component: ExamesList
        },
        {
          path: "novo",
          component: ExameNew,
          name: "NovoExame"
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
      beforeEnter: common,
      children: [
        {
          path: "",
          name: "consultas",
          component: ConsultasList
        },
        {
          path: "nova",
          component: ConsultaNew,
          name: "NovoConsulta"
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
      beforeEnter: common
    }
  ]
});

router.beforeEach = (to, from, next) => {
  let account = store.state.account;
  if (!account.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

export default router;
