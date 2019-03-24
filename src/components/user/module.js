import api from "@/utils/api.js";
import axios from "axios";

const moduleUserManagement = {
  namespaced: true,
  state: {
    getApi: "https://api.coindesk.com/v1/bpi/currentprice.json",
    // getCompanyGrouApi: process.env.VUE_APP_API_ADMINS_COMPANIES_GROUP,
    // postApi: process.env.VUE_APP_API_ADMINS_ADMINS_USERS_BULK_IMPORT,

    allUsersInfo: [],
    allCompanyGroupInfo: [],
    newUsers: {
      empty: false,
      input: false,
      checkbox: false,
      login_id: "",
      name: "",
      kana: "",
      description: "",
      rate: "",
      code: "",
      registeredUser: false
    },
    deleteUsers: [],
    allCheck: false
  },
  mutations: {
    setAllUsersInfo: function(state, value) {
      state.allUsersInfo = value;
    },
    setDeleteUsers: function(state, value) {
      state.deleteUsers = value;
    },
    setManagementApiData: function(state, payload) {
      console.log(payload.getManagement);
      // console.log(payload.getCompanyGroup);
      // payload.getManagement.map(array => array.)
      // payload.getManagement.unshift(state.colHeaders);
      state.allUsersInfo = [payload.getManagement];
      // const addNewUsers = JSON.parse(JSON.stringify(state.newUsers));
      // const initialView = payload.getManagement.concat(addNewUsers);

      // state.allUsersInfo = initialView;
    },
    setCompanyGroupApiData: function(state, payload) {
      // console.log(payload.getCompanyGroup);
      state.allCompanyGroupInfo = payload.getCompanyGroup;
    }
  },
  getters: {},
  actions: {
    // 非同期処理あっているか確認が必要
    getManagementApi: async function(context) {
      const payload = {
        getManagement: null,
        getCompanyGroup: null
      };
      const apiManagementData = () => {
        return api.get(context.state.getApi);
      };
      // const apiCompanyGroupData = () => {
      //   return api.get(context.state.getCompanyGrouApi);
      // };
      try {
        const getApiData = await axios.all([
          apiManagementData()
          // apiCompanyGroupData()
        ]);
        // console.log(await getApiData[0].data.bpi);
        const usersInfo = await getApiData[0].data.bpi.EUR;
        // await usersInfo.map(value => {
        //   value.is_company_user = context.getters.getStringByIsCompanyUser(
        //     value.is_company_user
        //   );
        // value.status = context.getters.getStringByStatus(value.status);

        (usersInfo.checkbox = await false),
          (usersInfo.registeredUser = await true),
          (usersInfo.input = await false),
          (usersInfo.empty = await false);
        // });

        payload.getManagement = await usersInfo;
        // console.log(await payload.getManagement);
        await context.commit("setManagementApiData", payload);

        // ここからグループ
        // if (getApiData[1].status === 200) {
        //   const companyGroups = await getApiData[1].data.company_groups;
        //   payload.getCompanyGroup = await companyGroups;

        //   await context.commit("setCompanyGroupApiData", payload);
        // }
      } catch (error) {
        alert(error);
      }
    }
  }
};
export default moduleUserManagement;
