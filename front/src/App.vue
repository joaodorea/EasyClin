<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>
<script>
import navbar from '@/modules/shared/Navbar';
import myFooter from '@/modules/shared/Footer';

export default {
  components: {
    navbar,
    myFooter,
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
