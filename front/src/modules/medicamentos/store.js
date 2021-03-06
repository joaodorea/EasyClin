import util from "../../api/index";
const api = util("medicamentos");

const state = {
  list: [],
  medicamento: {},
  total: 0
};

const getters = {
  list: () => state.list,
  getOne: () => state.medicamento,
  total: state => state.total
};

const mutations = {
  getList(state, list) {
    state.list = list;
  },
  setMedicamento(state, data) {
    state.medicamento = data;
  },
  setTotal(state, total) {
    state.total = total;
  },
  new(state) {
    state.medicamento = {
      fab: "",
      name: "",
      nameFab: ""
    };
  }
};

const actions = {
  getList: async function({ commit }, params) {
    const res = await api.getAll({ params });
    commit("getList", res.data.items);
    commit("setTotal", res.data.total);
    return res.data;
  },
  create: async function({ commit, dispatch }, med) {
    const res = await api.create(med);
    dispatch("getList");
    return res;
  },
  getOne: async function({ commit, dispatch }, id) {
    const res = await api.getOne(id);
    commit("setMedicamento", res.data);
    return res.data;
  },
  remove: async function({ commit, dispatch }, id) {
    const res = await api.delete(id);
    dispatch("getList");
    return res.data;
  },
  new: ({ commit }) => {
    commit("new");
    return;
  },
  update: async function({ c, dispatch }, item) {
    const res = await api.update(item);
    dispatch("getList");
    return res.data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
