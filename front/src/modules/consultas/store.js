import util from "../../api/index";
const api = util("consultas");

const state = {
  list: [],
  item: {},
  new: {}
};

const getters = {
  list: state => state.list,
  item: state => state.item,
  new: state => state.new
};

const mutations = {
  getList(state, list) {
    state.list = list;
  },
  getItem(state, item) {
    state.item = item;
  },
  new(state, data) {
    state.new = {
      pacientes: data.pacientes,
      medicos: data.medicos
    }
  }
};

const actions = {
  create: async function({}, item) {
    const res = await api.create(item);
    return res;
  },
  getList: async function({ commit }) {
    const res = await api.getAll();
    commit("getList", res.data);
    return res.data;
  },
  getOne: async function({ commit }, id) {
    const res = await api.getOne(id);
    commit("getItem", res.data);
    return res.data;
  },
  delete: async function({}, id) {
    const res = await api.delete(id); 
    return res;
  },
  new: async function({ commit }) {
    const res = await api.getOne('new');
    commit("new", res.data);
    return res.data;
  },
  update: async function({}, item) {
    const res = await api.update(item);
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
