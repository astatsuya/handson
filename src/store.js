import Vue from "vue";
import Vuex from "vuex";
import moduleUserManagement from "@/components/user/module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userManagement: moduleUserManagement
  }
});
