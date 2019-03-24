import api from "@/utils/api.js";
import axios from "axios";

const moduleUserManagement = {
  namespaced: true,
  state: {
    getApi: "https://api.coindesk.com/v1/bpi/currentprice.json",
    // getCompanyGrouApi: process.env.VUE_APP_API_ADMINS_COMPANIES_GROUP,

    allUsersInfo: [],
    newUsers: {
      checkbox: false,
      description: "",
      rate: "",
      rate_float: "",
      code: "",
      registeredUser: false
    }
  },
  mutations: {
    setAllUsersInfo: function(state, value) {
      state.allUsersInfo = value;
    },
    setManagementApiData: function(state, payload) {
      state.allUsersInfo = [payload.getManagement];
    }
  },
  getters: {
    newGroupsInfo: state => value => {
      console.log(state.allUsersInfo);
      return state.allUsersInfo;
    }
  },
  actions: {
    getManagementApi: async function(context) {
      const payload = {
        getManagement: null
      };
      const apiManagementData = () => {
        return api.get(context.state.getApi);
      };
      try {
        const getApiData = await axios.all([apiManagementData()]);
        const usersInfo = await getApiData[0].data.bpi.EUR;
        usersInfo.checkbox = await true;
        usersInfo.registeredUser = await true;
        payload.getManagement = await usersInfo;
        await context.commit("setManagementApiData", payload);
      } catch (error) {
        alert(error);
      }
    }
  }
};
export default moduleUserManagement;
