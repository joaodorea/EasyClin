<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 mx-auto">
        <form @submit.prevent="send">
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
          <router-link class="text-primary backBtn" to="/login" tag="span">Voltar</router-link>
          <button type="submit" class="btn btn-primary float-right">Recuperar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    ...mapActions({
      forget: "account/forgetPassword"
    }),
    send() {
      this.forget(this.email).then(resp => {
        if (resp.msg) {
          alert(resp.msg);
          this.email = "";
          document.getElementById("exampleInputEmail1").focus();
        } else if (resp.status == "OK") {
          alert(
            "Senha enviada ao seu email. Não se esqueça de verificar sua caixa de spam."
          );
          this.$router.push("/");
        }
      });
    }
  },
  mounted() {
    document.getElementById("exampleInputEmail1").focus();
  }
};
</script>

<style>
.backBtn {
  text-decoration: underline;
  cursor: pointer;
}
</style>
