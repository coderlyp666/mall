import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import modules from "./modules";

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
});

export default store;
