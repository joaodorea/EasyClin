import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import moment from 'moment';
import './assets/styles/index.scss';

import $ from 'jquery';
import 'fullcalendar';

Vue.prototype.$ = $;
Vue.prototype.$.calendar = $.fullCalendar;

moment.locale('pt-BR');
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

Vue.filter("moment", function(value, format) {
  return moment(value).local().format(format)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
