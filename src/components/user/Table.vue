<template>
  <div class="handson" :style="{ 'margin-top': '10px', height: '200px', width: '1500px' }">
    <button @click="showData">data</button>
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
    ...mapState(["allUsersInfo", "allCompanyGroupInfo", "newUsers"]),
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
        columns: [
          { data: "checkbox", type: "checkbox" },
          {
            data: "code",
            placeholder: "code",
            type: "text",
            allowEmpty: false
            // validator: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)(?<!.{100,})$/
          },
          {
            data: "description",
            placeholder: "description",
            allowEmpty: false,
            type: "text"
            // validator: /^.{1,50}$/
          },
          {
            data: "rate",
            type: "numeric",
            placeholder: "rate",
            allowEmpty: false
            // validator: /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、]+/
          },
          {
            data: "rate_float",
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
              // data: [this.$store.getters.newGroupsInfo]
            }
          },
          {
            // data: "company_group_id",
            type: "dropdown",
            placeholder: "ここの選択肢",
            allowEmpty: false,
            source: [this.$store.getters.newGroup]
            // ここになんらかの方法でapiからのデータを入れたい
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
        minSpareRows: 1,
        beforeCreateRow: this.beforeCreateRowVue,
        afterBeginEditing: this.afterBeginEditingVue,
        afterChange: this.afterChangeVue
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
    columnSources: function() {
      // console.log(this);
      // console.log(this.newUsers);
      // console.log(this.$store.getters.newGroupsInfo.code);
      return [{ ty: "fds" }, { ty: "jest" }];
    }
  },
  mounted: function() {
    this.getManagementApi();
  },
  methods: {
    ...mapMutations(["setAllUsersInfo"]),
    ...mapActions(["getManagementApi"]),
    // ここにapiのデータが入れられない
    // columnSources: function() {
    //   console.log(this);
    //   // これはvuexに最初からあるstate
    //   console.log(this.newUsers);
    //   // これがエラーになる。vuexでapiから取得したデータを入れたstate
    //   // 実際には別のapiから取得したデータを入れたい
    //   // console.log(this.currentAllUsersInfo);
    //   return [{ ty: "test" }, { ty: "jest" }];
    // },
    beforeCreateRowVue: function(index, amount, source) {
      const newUsers = Object.assign({}, this.newUsers);
      this.currentAllUsersInfo.push(newUsers);
    },
    afterBeginEditingVue: function(row) {
      // console.log(this.newUsers);
      this.currentAllUsersInfo[row].input = true;
    },
    afterChangeVue: function(changes, source) {
      if (source === "loadData") {
        return;
      }
      console.log(changes);
      console.log(this.$store.getters.currentAllUsersInfo);
    },
    showData: function() {
      console.log(this.$refs.hotTableComponent.hotInstance.getData());

      this.tableData = this.$refs.hotTableComponent.hotInstance.getData();
    }
  }
};
</script>

<style
  src="../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
