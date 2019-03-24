<template>
  <div class="home">
    <TableButtons/>
    <Table/>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/user/Table.vue";
import TableButtons from "@/components/user/TableButtons.vue";

export default {
  name: "home",
  components: {
    Table,
    TableButtons
  }
};
</script>
