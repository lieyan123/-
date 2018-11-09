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
import store from '@/store';
import {getStoreProduct} from "@/api/product";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "货物id", key: "productid", sortable: true },
        { title: "货名", key: "productname", editable: true },
        { title: "功能描述", key: "productdescription" },
        { title: "数量", key: "number" },
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
    getStoreProduct(this.$store.state.user.userId).then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
