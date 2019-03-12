<template>
    <div>
        <!-- <ul>
            <router-link to="/login">Login</router-link>
            <a @click="logoutFunc">Logout</a>
        </ul> -->
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations({
            "logout": "account/logout"
        }),
        logoutFunc() {
            if(confirm("Tem certeza que você deseja sair?")) {
                this.logout();
                this.$router.push("/login");
            }
        }
    }
}
</script>

<style>

</style>
