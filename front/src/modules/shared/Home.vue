<template>
  <div id="callendar"></div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions({
      getList: "consultas/getList",
      getExames: "exames/getList"
    })
  },
  mounted() {
    const vm = this;
    this.getList().then(res => {
      let list = res.reduce(function(acc, curr) {
        acc.push({
          title: "[con] " + curr.medico.name,
          start: vm
            .$moment(`${curr.dia} ${curr.hora}`, "DD/MM/YYYY HH:mm")
            .format(),
          url: `/consultas/${curr._id}`
        });
        return acc;
      }, []);
      generateCallendar(list);
    });

    function generateCallendar(events) {
      vm.$("#callendar").fullCalendar({
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,basicWeek,basicDay, list"
        },
        // defaultDate: "2019-01-12",
        navLinks: true, // can click day/week names to navigate views
        // editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#callendar {
  max-width: 1000px;
  margin: auto;
}
</style>

