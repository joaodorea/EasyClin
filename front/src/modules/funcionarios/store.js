import api from "../../api/index";

const state = {
  list: []
};

const getters = {
  list: state => state.list,
  getFuncionario: state => id => {
    return state.list.find(m => m.id === id);
  }
};
const mutations = {
  getList(state, list) {
    state.list = list;
  }
};
const actions = {
  getList({ commit }) {
    api
      .get("/funcionarios")
      .then(res => {
        commit("getList", res.data.func);
        res;
      })
      .catch(err => {
        return err;
      });
  },
  getMeds({ commit }) {
    api
      .get("/funcionarios/medicos")
      .then(res => {
        commit("getList", res.data.meds);
        res;
      })
      .catch(err => {
        return err;
      });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
