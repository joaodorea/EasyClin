<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 mx-auto">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input
              required
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Senha</label>
            <input
              required
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            >
          </div>
          <router-link
            class="recuperSenha text-primary"
            to="/recuperar-senha"
            tag="span"
          >Esqueci a senha</router-link>
          <button type="submit" class="btn btn-primary loginBtn">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({
      signIn: "account/login"
    }),
    login() {
      const { email, password } = this;
      this.signIn({ email, password })
        .then(res => {
          alert("Login realizado com sucesso!");
          this.$router.push("/");
        })
        .catch(err => {
          alert(err);
          this.password = "";
        });
    }
  },
  mounted() {
    document.getElementById("exampleInputEmail1").focus();
  }
};
</script>
<style scoped>
.recuperSenha {
  text-decoration: underline;
  cursor: pointer;
}
.loginBtn {
  float: right;
}
</style>