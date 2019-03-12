import util from "../../api/index";
const api = util("pacientes");

const state = {
  list: [],
  paciente: {
    name: "",
    email: "",
    endereco: "",
    enderecoComp: "",
    cidadeEstado: "",
    telefone1: "",
    telefone2: "",
    cpf: "",
    convenio: "",
    codigoConvenio: "",
    exames: []
  }
};

const getters = {
  list: state => state.list,
  getOne: state => state.paciente,
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  setPaciente(state, paciente) {
    state.paciente = paciente;
  },
  new() {
    state.paciente = {
      name: "",
      email: "",
      endereco: "",
      enderecoComp: "",
      cidadeEstado: "",
      telefone1: "",
      telefone2: "",
      cpf: "",
      convenio: "",
      codigoConvenio: "",
      exames: []
    };
  }
};

const actions = {
  setList: async function({ commit }) {
    const res = await api.getAll();
    commit("setList", res.data);
    return res.data;
  },
  getOne: async function({ commit }, id) {
    const res = await api.getOne(id);
    commit("setPaciente", res.data);
    return res.data;
  },
  add: async function({ commit }, paciente) {
    const res = await api.create(paciente);
    commit("setList");
    return res.data;
  },
  delete: async function({}, id) {
    const res = await api.delete(id);
    return res.data;
  },
  update: async function({ commit }, paciente) {
    const res = await api.update(paciente);
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
