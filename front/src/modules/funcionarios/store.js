import util from "../../api/index";
const api = util("funcionarios");

const state = {
  list: [],
  new: {},
  funcionario: {},
  total: 0
};
const getters = {
  funcionario: state => state.funcionario,
  list: state => state.list,
  total: state => state.total
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  setOne(state, funcionario) {
    state.funcionario = funcionario;
  },
  setTotal(state, total) {
    state.total = total;
  }
};

const actions = {
  getList: async function({ commit }, params) {
    const res = await api.getAll({ params });
    commit("setList", res.data.items);
    commit("setTotal", res.data.total);
    return res.data;
  },
  create: async function({}, funcionario) {
    const res = await api.create(funcionario);
    return res.data;
  },
  getOne: async function({ commit }, id) {
    const res = await api.getOne(id);
    let func = res.data.funcionario;
    func.hasAccount = res.data.hasAccount;

    commit("setOne", func);
    return func;
  },
  remove: async function({ commit, dispatch }, id) {
    const res = await api.delete(id);
    dispatch("getList");
    return res.data;
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
