import store from "../store/index";

const guard = () => {
  const isAuth = store.getters["account/isAuth"];
  const token = store.getters["account/token"];
  const user = store.getters["account/user"];

  if (isAuth && user) {
    return true;
  } else if (isAuth && !user) {
    return store.dispatch("account/getUserByToken", token).then(() => true);
  } else {
    return false;
  }
};

const isAdmin = async (to, from, next) => {
  const isGuarded = await guard();
  if (!isGuarded) {
    next("/login");
    return;
  }
  const profile = store.getters["account/user"].profile;
  if (profile !== "Administrador") {
    alert("Você não tem perminssão para acessar essa página");
    next("/");
  } else {
    next();
  }
};

const common = (tp, from, next) => {
  const isGuarded = guard();
  if (isGuarded) {
    next();
  } else {
    next("/login");
  }
};

export { guard, isAdmin, common };
