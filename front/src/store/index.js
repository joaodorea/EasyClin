import Vue from 'vue'
import Vuex from 'vuex'

import medicamentos from '../modules/medicamentos/store.js';
import pacientes from '../modules/pacientes/store.js';
import funcionarios from '../modules/funcionarios/store.js';
import exames from '../modules/exames/store.js';
import consultas from '../modules/consultas/store.js';
import receitas from '../modules/consultas/storeReceitas.js';
import account from '../modules/account/account.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    medicamentos,
    pacientes,
    funcionarios,
    exames,
    consultas,
    receitas,
    account
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
