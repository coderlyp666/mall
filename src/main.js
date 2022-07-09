import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import toast from "components/common/toast";

import Fastclick from "fastclick";

import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();

Vue.use(toast);

//解决移动端300延迟的问题
Fastclick.attach(document.body);

//使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/placeholder.png"),
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");