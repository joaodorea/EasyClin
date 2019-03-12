import store from "../store/index";

const guard = (to, from, next) => {
  if (store.getters["account/isAuth"] && store.getters["account/user"]) {
    next();
  }
  else if(store.getters["account/isAuth"] && !store.getters["account/user"]) {
    store.dispatch("account/getUserByToken", store.getters["account/token"]).then( () => {
      next();
    });
  }
  else {
    next("/login");
  }
};

export default guard;