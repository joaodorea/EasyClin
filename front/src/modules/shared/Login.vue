<template>
<div class="container">
    <div class="row">
        <div class="col-md-5 mx-auto">
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                        v-model="email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
</template>
<script>
    /* eslint-disable */
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            ...mapActions({
                signIn: "account/login"
            }),
            login() {
                const { email, password } = this;
                this.signIn({email, password})
                .then( res => {
                        alert("Login realizado com sucesso!")
                        this.$router.push('/')
                    }
                ).catch( err => {
                    alert(err)
                    this.password = '';
                })
            }
        }
    };
</script>
<style>
</style>