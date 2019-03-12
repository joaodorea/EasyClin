<template>
<div>
  <list />
  <router-view></router-view>
</div>
</template>

<script>
import list from './list.vue'
export default {
  components: {
    list
  }
};
</script>

<style scoped lang="scss">
h2 small {
  font-size: 0.6em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>