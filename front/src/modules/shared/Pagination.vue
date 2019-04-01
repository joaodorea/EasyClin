<template>
  <div class="mb-3 mt-3" v-if="items < total">
    <pagination v-model="page" :records="total" :per-page="items" @paginate="myCallback"></pagination>
    <div class="btn-group float-right" role="group" aria-label="Basic example">
      <button @click="itemsQtd(25)" type="button" class="btn btn-outline-secondary">25</button>
      <button @click="itemsQtd(50)" type="button" class="btn btn-outline-secondary">50</button>
      <button @click="itemsQtd(100)" type="button" class="btn btn-outline-secondary">100</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from "vue-pagination-2";

export default {
  data() {
    return {
      page: 1,
      items: +this.$route.query.items || 50
    };
  },
  props: ["total"],
  components: {
    Pagination
  },
  mouted() {
    console.log(this.items);
  },
  methods: {
    myCallback(p) {
      this.page = p;
      this.$router.push({ query: { page: p, items: this.items } });
      this.$emit("clicked");
    },
    itemsQtd(q) {
      this.items = q;
      this.$router.push({ query: { page: this.page, items: this.items } });
      this.$emit("clicked");
    }
  }
};
</script>

<style>
.VuePagination {
  display: inline-block;
}
.VuePagination__count {
  display: none;
}
</style>
