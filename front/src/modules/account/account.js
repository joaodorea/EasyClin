/* eslint-disable */
import axios from "axios";

const state = {
  user: null,
  token: localStorage.auth,
  isAuthenticated: !!localStorage.auth || false
};

const getters = {
  user: () => state.user,
  token: () => state.token,
  isAuth: () => state.isAuthenticated
};

const mutations = {
  login(state, data) {
    state.token = data.token;
    state.user = data.user;
    state.isAuthenticated = true;
  },
  logout(state) {
    state.isAuthenticated = false;
    delete localStorage.auth;
    state.token = null;
  },
  setUserByToken(state, data) {
    state.user = data.user;
    state.user.schedule = data.schedule;
  },
  clearUser(state) {
    state.user = null;
    state.isAuthenticated = false;
    delete localStorage.auth;
    state.token = false;
  }
};

const actions = {
  login: async function({ commit }, user) {
    await axios
      .post("http://localhost:3000/api/login", {
        email: user.email,
        password: user.password
      })
      .then(res => {
        if (res.status == 200 && res.data.user) {
          localStorage.setItem("auth", res.data.token);
          commit("login", {
            user: res.data.user,
            token: res.data.token,
            profile: res.data.profile
          });
          axios.defaults.headers.common["auth"] = res.data.token;
          return;
        } else {
          return Promise.reject("Tente novamente.");
        }
      })
      .catch(err => {
        return Promise.reject("Verifique os dados e tente novamente");
      });
  },
  create: async function({}, item) {
    const res = await axios.post("http://localhost:3000/api/users", item);
    return res;
  },
  changePassword: async function({}, item) {
    const res = await axios.post(
      "http://localhost:3000/api/users/change-password",
      item
    );
    return res.data;
  },
  getUserByToken: async function({ commit }, token) {
    let res;
    try {
      res = await axios.post("http://localhost:3000/api/users/token", {
        token
      });
      commit("setUserByToken", res.data);
    } catch {
      commit("clearUser");
    }
    return res;
  },
  saveSchedule: async function({}, user) {
    const res = await axios.post("http://localhost:3000/api/users/" + user.id, {
      schedule: user.schedule
    });
    return res;
  },
  getMedico: async function({}, id) {
    const res = await axios.get("http://localhost:3000/api/users/medico/" + id);
    // commit("setUserByToken", res.data)
    return res;
  },
  forgetPassword: async function({ commit }, email) {
    const res = await axios.post(
      "http://localhost:3000/api/users/forget-password/",
      { email }
    );
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
