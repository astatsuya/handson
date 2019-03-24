<template>
  <div class="user-buttons">
    <button @click="postConfirm">現在のallUsersInfo</button>
    <button @click="resetConfirm">リセット</button>
  </div>
</template>

<script>
import axios from "axios";
// import uuid from "uuid";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("userManagement");

export default {
  computed: {
    ...mapState([
      "getApi",
      "postApi",
      "allUsersInfo",
      "allCompanyGroupInfo",
      "convertValueToStrings",
      "newUsers",
      "deleteUsers",
      "allCheck",
      "clickedTableRowIndex",
      "showContextMenu",
      "contextMenuX",
      "contextMenuY"
    ]),
    ...mapGetters(["getStringByIsCompanyUser", "getStringByStatus"]),
    currentAllUsersInfo: {
      get() {
        return this.allUsersInfo;
      },
      set(value) {
        this.setAllUsersInfo(value);
      }
    },
    currentAllCompanyGroupInfo: {
      get() {
        return this.allCompanyGroupInfo;
      },
      set(value) {
        this.setCompanyGroupApiData(value);
      }
    },

    currentDeleteUsers: {
      get() {
        return this.deleteUsers;
      },
      set(value) {
        this.setDeleteUsers(value);
      }
    },
    updateDataToPost: function() {
      const filteredadminsUsers = this.currentAllUsersInfo.filter(
        checked => checked.input && checked.registeredUser
      );
      return filteredadminsUsers.map(update => ({
        id: update.id,
        name: update.name,
        kana: update.kana,
        company_group_id: update.company_group_id,
        is_company_user: update.is_company_user,
        updated: {
          by: update.updated.by,
          // ここはapiget時の時間をそのまま送る
          at: update.updated.at
        }
      }));
    },
    createdDataToPost: function() {
      const filteredNewUsers = this.currentAllUsersInfo.filter(
        checked => checked.input && checked.registeredUser !== true
      );
      return filteredNewUsers.map(created => ({
        login_id: created.login_id,
        name: created.name,
        kana: created.kana,
        company_group_id: created.company_group_id,
        is_company_user: created.is_company_user
      }));
    },
    deleteDataToPost: function() {
      this.currentDeleteUsers.map(value => {
        if (
          value.is_company_user ===
          this.convertValueToStrings.is_company_user.zero
        ) {
          value.is_company_user = 0;
        } else if (
          value.is_company_user ===
          this.convertValueToStrings.is_company_user.one
        ) {
          value.is_company_user = 1;
        }
      });

      return this.currentDeleteUsers.map(deleted => ({
        id: deleted.id,
        is_company_user: deleted.is_company_user
      }));
    },
    // もっといい書き方を検討する必要がある
    filterEmptyData: function() {
      const postData = {};
      if (this.updateDataToPost.length >= 1) {
        postData.update = this.updateDataToPost;
      }
      if (this.createdDataToPost.length >= 1) {
        postData.create = this.createdDataToPost;
      }
      if (this.deleteDataToPost.length >= 1) {
        postData.delete = this.deleteDataToPost;
      }
      return postData;
    }
  },
  methods: {
    ...mapMutations([
      "setAllUsersInfo",
      // "setNewUsers",
      "setManagementApiData",
      "setCompanyGroupApiData",
      "setDeleteUsers",
      "setAllCheck",
      "setClickedTableRowIndex",
      "setShowContextMenu",
      "setContextMenuX",
      "setContextMenuY"
    ]),
    ...mapActions(["getManagementApi"]),
    modifyStringsToValue: function() {
      this.currentAllUsersInfo.map(value => {
        if (
          value.is_company_user ===
          this.convertValueToStrings.is_company_user.zero
        ) {
          value.is_company_user = 0;
        } else if (
          value.is_company_user ===
          this.convertValueToStrings.is_company_user.one
        ) {
          value.is_company_user = 1;
        }
        if (value.status === this.convertValueToStrings.status.zero) {
          value.status = 0;
        } else if (value.status === this.convertValueToStrings.status.one) {
          value.status = 1;
        } else if (value.status === this.convertValueToStrings.status.two) {
          value.status = 2;
        }
      });
    },
    checkGroups: function() {
      for (let i = 0; i < this.allUsersInfo.length; i++) {
        if (
          this.allUsersInfo[i].is_company_user ==
            this.convertValueToStrings.is_company_user.zero &&
          this.allUsersInfo[i].company_group_id
        ) {
          alert("JFS管理ユーザーは企業グループを設定できません。");
          return true;
        }
      }
    },
    resetConfirm: function() {
      // リセットメッセージ未実装
      if (confirm("リセットメッセージを挿入")) {
        this.resetLocalData();
        this.getManagementApi();
      }
    },
    addEmpty: function() {
      const emptyItem = value => {
        return value !== "";
      };

      for (let i = 0; i < this.currentAllUsersInfo.length; i++) {
        if (this.currentAllUsersInfo[i].input) {
          Object.values(this.currentAllUsersInfo[i]).every(emptyItem)
            ? (this.currentAllUsersInfo[i].empty = false)
            : (this.currentAllUsersInfo[i].empty = true);
        }
      }
      return this.currentAllUsersInfo.filter(value => value.empty).length === 0
        ? false
        : true;
    },
    postConfirm: function() {
      console.log(this.allUsersInfo);
    },
    resetLocalData: function() {
      this.currentAllUsersInfo = [];
      this.currentDeleteUsers = [];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
