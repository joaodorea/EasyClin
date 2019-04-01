import util from "../../api/index";
const api = util("exames");

const state = {
  exame: {
    name: "",
    paciente: {},
    medico: {},
    medicamento: [],
    desc: "",
    local: "",
    origem: "",
    tipo: ""
  },
  list: [],
  new: {},
  total: 0
};
const getters = {
  exame: state => state.exame,
  new: state => state.new,
  list: state => state.list,
  total: state => state.total
};

const mutations = {
  new(state, data) {
    state.new = {
      pacientes: data.pacientes,
      medicos: data.medicos,
      medicamentos: data.medicamentos
    };
  },
  setList(state, list) {
    state.list = list;
  },
  setOne(state, exame) {
    state.exame = exame;
  },
  setTotal(state, total) {
    state.total = total;
  }
};

const actions = {
  getList: async function({ commit }, params) {
    const res = await api.getAll({ params });
    commit("setList", res.data.items);
    commit("setTotal", +res.data.total);
    return res.data;
  },
  create: async function({}, exame) {
    const res = await api.create(exame);
    return res.data;
  },
  remove: async function({ commit, dispatch }, id) {
    const res = await api.delete(id);
    return res.data;
  },
  update: async function({ c, dispatch }, item) {
    const res = await api.update(item);
    return res.data;
  },
  new: async function({ commit }) {
    state.exame = {
      name: "",
      paciente: {},
      medico: {},
      medicamento: [],
      desc: "",
      local: "",
      origem: "",
      tipo: ""
    };
    const res = await api.getOne("new");
    commit("new", res.data);
    return res.data;
  },
  getOne: async function({ commit }, id) {
    const res = await api.getOne(id);
    commit("setOne", res.data);
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
