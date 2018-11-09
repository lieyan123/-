<template>
  <div>
    <Card>
      <tables highlight-row ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"  />
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import {getStore} from "@/api/product";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "仓库id", key: "Storeid", sortable: true },
        { title: "仓库名", key: "Storename", editable: true },
        { title: "仓库位置", key: "Address" },
        { title: "仓库描述", key: "Description" },
        { title: "所属仓库人", key: "name" }
      ],
      tableData: [],
    };
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getStore().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
