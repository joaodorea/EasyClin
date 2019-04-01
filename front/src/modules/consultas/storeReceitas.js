import util from "../../api/index";
const api = util("consulta");

const state = {
    list: [],
};

const getters = {
    list: state => state.list,
};

const mutations = {
    setList(state, list) {
        state.list = list;
    },
};

const actions = {
    createReceita: async function ({}, item) {
        const res = await api.create(item, item.consulta + '/receitas');
        return res;
    },
    getListReceitas: async function ({ commit }, consulta) {
        const res = await api.getAllPath(consulta + '/receitas');
        commit("setList", res.data);
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