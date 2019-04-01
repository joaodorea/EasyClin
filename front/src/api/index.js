import axios from "axios";

const instance = function(url) {
  const api = axios.create({
    baseURL: "http://localhost:3000/api/" + url
  });
  axios.defaults.headers.common["auth"] = localStorage.auth;

  return {
    getAll: function(params) {
      return api.get("/", params);
    },
    getAllPath: function(path = "") {
      return api.get("/" + path);
    },
    getOne: function(id) {
      return api.get("/" + id);
    },
    delete: function(id) {
      return api.delete("/" + id);
    },
    update: function(data) {
      return api.put("/" + data._id, data);
    },
    create: function(data, path = "") {
      return api.post("/" + path, data);
    }
  };
};

export default instance;
