<template>
  <div class="handson" :style="{ 'margin-top': '10px', height: '200px', width: '1500px' }">
    <button @click="showData">data</button>
    {{tableData}}
    <HotTable :data="currentAllUsersInfo" :settings="hotSettings" ref="hotTableComponent"/>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
// import Handsontable from "handsontable";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "userManagement"
);

export default {
  components: {
    HotTable
  },
  data: function() {
    return {
      root: "test-hot",
      tableData: null,
      dataBind: [{ est: "ee" }, { est: "bb" }]
    };
  },
  computed: {
    ...mapState([
      "allUsersInfo",
      "allCompanyGroupInfo",
      "newUsers",
      "deleteUsers",
      "allCheck"
    ]),
    hotSettings: function() {
      return {
        // data: [],
        colHeaders: [
          "",
          "code",
          "description",
          "rate",
          "dropdown",
          "dropdown",
          "dropdown"
        ],
        // columns: function(column) {
        //   let columnMeta = {};

        //   if (column === 0) {
        //     columnMeta.data = "checkbox";
        //     columnMeta.type = "checkbox";
        //   } else if (column === 1) {
        //     columnMeta.data = "login_id";
        //     columnMeta.type = "text";
        //     columnMeta.validator = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //     // columnMeta.readOnly = true;
        //   } else if (column === 2) {
        //     columnMeta.data = "name";
        //     columnMeta.type = "text";
        //   } else if (column === 3) {
        //     columnMeta.data = "kana";
        //     columnMeta.type = "text";
        //     columnMeta.validator = /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、]+/;
        //   } else if (column === 4) {
        //     columnMeta.data = "is_company_user";
        //     columnMeta.type = "dropdown";
        //     columnMeta.source = ["企業", "ユーザー"];
        //     // columnMeta.strict = true;
        //   } else if (column === 5) {
        //     columnMeta.data = "company_group_id";
        //     columnMeta.type = "dropdown";
        //   } else if (column === 6) {
        //     columnMeta.data = "status";
        //     columnMeta.type = "dropdown";
        //   } else {
        //     columnMeta = null;
        //   }
        //   return columnMeta;
        // },
        columns: [
          { data: "checkbox", type: "checkbox" },
          {
            data: "code",
            placeholder: "ログインID",
            type: "text",
            allowEmpty: false,
            validator: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)(?<!.{100,})$/
          },
          {
            data: "description",
            placeholder: "ユーザー名",
            allowEmpty: false,
            type: "text",
            validator: /^.{1,50}$/
          },
          {
            data: "rate",
            type: "numeric",
            placeholder: "かな",
            allowEmpty: false,
            validator: /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、]+/
          },
          {
            data: "is_company_user",
            type: "dropdown",
            placeholder: "test",
            allowEmpty: false,
            source: ["test1", "test2"]
          },
          {
            // data: "company_group_id",
            type: "handsontable",
            placeholder: "ここの選択肢",
            allowEmpty: false,
            handsontable: {
              // ここになんらかの方法でapiからのデータを入れたい
              data: this.columnSources()
            }
          },
          {
            // data: "company_group_id",
            type: "dropdown",
            placeholder: "ここの選択肢",
            allowEmpty: false,
            source: this.columnSources()
            // ここになんらかの方法でapiからのデータを入れたい
          },
          // {
          //   data: "company_group_id",
          //   type: "dropdown",
          //   placeholder: "企業グループ",
          //   allowEmpty: false,
          //   source: ["企業", "user"]
          // },
          {
            data: "status",
            type: "dropdown",
            placeholder: "last",
            allowEmpty: false,
            source: ["last1", "last2", "last3"]
          }
        ],
        contextMenu: {
          items: {
            row_above: {
              name: "上に行を挿入"
              // callback: this.addRow
            },
            row_below: {
              name: "下に行を挿入"
            },
            remove_row: {
              name: "行を削除"
            }
          }
        },
        cells: this.cellsVue,
        minSpareRows: 1,
        beforeCreateRow: this.beforeCreateRowVue,
        beforeRemoveRow: this.beforeRemoveRowVue,
        afterBeginEditing: this.afterBeginEditingVue
        // language: "en-EN",
      };
    },
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
    currentAllCheck: {
      get() {
        return this.allCheck;
      },
      set(value) {
        this.setAllCheck(value);
      }
    },
    currentDeleteUsers: {
      get() {
        return this.deleteUsers;
      },
      set(value) {
        this.setDeleteUsers(value);
      }
    }
    // columnSources: function() {
    //   console.log(this);
    //   console.log(this.newUsers);
    //   return [{ ty: "test" }, { ty: "jest" }];
    // }
  },
  mounted: function() {
    this.getManagementApi();
  },
  methods: {
    ...mapMutations([
      "setAllUsersInfo",
      "setAllCheck",
      "setClickedTableRowIndex",
      "setDeleteUsers",
      "setCompanyGroupApiData"
    ]),
    ...mapActions(["getManagementApi"]),
    // ここにapiのデータが入れられない
    columnSources: function() {
      console.log(this);
      // これはvuexに最初からあるstate
      console.log(this.newUsers);
      // これがエラーになる。vuexでapiから取得したデータを入れたstate
      // 実際には別のapiから取得したデータを入れたい
      // console.log(this.currentAllUsersInfo);
      return [{ ty: "test" }, { ty: "jest" }];
    },
    beforeCreateRowVue: function(index, amount, source) {
      const newUsers = Object.assign({}, this.newUsers);
      this.currentAllUsersInfo.push(newUsers);
    },
    beforeRemoveRowVue: function(index) {
      if (this.currentAllUsersInfo[index].registeredUser) {
        this.currentDeleteUsers.push(this.currentAllUsersInfo[index]);
      }
      this.currentAllUsersInfo.splice(index, 1);
    },
    afterBeginEditingVue: function(row) {
      console.log(this.newUsers);
      this.currentAllUsersInfo[row].input = true;
    },
    showData: function() {
      console.log(this.$refs.hotTableComponent.hotInstance.getData());

      this.tableData = this.$refs.hotTableComponent.hotInstance.getData();
    }
    // changeAllCheckbox: function() {
    //   this.allCheck !== true
    //     ? this.currentAllUsersInfo.map(value => (value.checkbox = true))
    //     : this.currentAllUsersInfo.map(value => (value.checkbox = false));
    // },
    // cellsVue: function(row, col, prop) {
    //   let cellProperties = {};
    //   // if (row === 0) {
    //   //   cellProperties.readOnly = true;
    //   // }
    //   if (this.currentAllUsersInfo[row].registeredUser && prop === "login_id") {
    //     cellProperties.readOnly = true;
    //   }
    //   if (
    //     this.currentAllUsersInfo[row].registeredUser &&
    //     prop === "is_company_user"
    //   ) {
    //     cellProperties.readOnly = true;
    //   }
    //   if (
    //     this.currentAllUsersInfo[row].registeredUser &&
    //     prop === "company_group_id"
    //   ) {
    //     cellProperties.readOnly = true;
    //   }
    //   return cellProperties;
    // }
  }
};
</script>

<style
  src="../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
