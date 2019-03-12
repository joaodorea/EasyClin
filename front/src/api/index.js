import axios from "axios";

const instance = function(url) {
  const api = axios.create({
    baseURL: "http://localhost:3000/" + url,
  })
  axios.defaults.headers.common["auth"] = localStorage.auth;

  // api.interceptors.response.use(
  //   resp => {
  //     console.log(resp)
  //     return resp;
  //   },
  //   err => {
  //     console.log(err)
  //     return Promise.reject(err);
  //   }
  // );

  return {
    getAll: function(path='') {
      return api.get("/" + path)
    },
    getOne: function(id) {
      return api.get("/" + id)
    },
    delete: function(id) {
      return api.delete("/" + id)
    },
    update: function(data) {
      return api.put("/" + data._id, data)
    },
    create: function(data, path='') {
      return api.post("/" + path, data)
    }
  }
}

export default instance;
