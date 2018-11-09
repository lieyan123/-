<template>
  <div>
    <Card>
      <tables highlight-row ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Button style="margin: 10px;" type="primary" @click="handleRender">新增货物数据</Button>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import store from "@/store";
import { getProduct, insertProduct } from "@/api/product";
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
        { title: "功能描述", key: "description" }
      ],
      tableData: [],
      productdata: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    handleRender() {
      this.$Modal.confirm({
        onOk: () => {
          console.log(this.productdata);
          insertProduct(this.productdata.name,this.productdata.description).then(res => {
            this.$Message.success("添加货物信息成功");
          });
          getProduct().then(res => {
            this.tableData = res.data;
          });
        },
        render: h => {
          return h("div", [
            h("Input", {
              props: {
                value: this.productdata.name,
                autofocus: true,
                placeholder: "输入货名..."
              },
              on: {
                input: val => {
                  this.productdata.name = val;
                }
              }
            }),
            h("Input", {
              props: {
                value: this.productdata.description,
                autofocus: true,
                placeholder: "输入货品描述..."
              },
              on: {
                input: val => {
                  this.productdata.description = val;
                }
              }
            })
          ]);
        }
      });
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getProduct().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
