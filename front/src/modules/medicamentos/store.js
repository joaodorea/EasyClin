import util from '../../api/index';
const api = util("medicamentos")

const state = {
  list: [],
  medicamento: {}
};

const getters = {
  list: () => state.list,
  getOne: () => state.medicamento
};

const mutations = {
  getList(state, list) {
    state.list = list;
  },
  setMedicamento(state, data) {
    state.medicamento = data;
  },
  new(state) {
    state.medicamento = {
      fab: "",
      name: "",
      nameFab: ""
    }
  }
};

const actions = {
  getList: async function({ commit }) {
    const res = await api.getAll();
    commit("getList", res.data);
    return res.data;
  },
  create: async function({commit, dispatch}, med) {
    const res = await api.create(med);
    dispatch("getList");
    return res.data;
  },
  getOne: async function({commit, dispatch}, id) {
    const res = await api.getOne(id);
    commit("setMedicamento", res.data);
    return res.data;
  },
  remove: async function({commit, dispatch}, id) {
    const res = await api.delete(id);
    dispatch("getList");
    return res.data;
  },
  new: ({commit}) => {
    commit("new");
    return;
  },
  update: async function({c, dispatch}, item) {
    const res = await api.update(item);
    dispatch("getList")
    return res.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
