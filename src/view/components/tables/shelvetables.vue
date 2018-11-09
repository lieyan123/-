<template>
  <div>
    <Card>
      <tables highlight-row ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getProductGroup, importProduct } from "@/api/product";
export default {
  inject: ["reload"],
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "进货表id", key: "groupid", sortable: true },
        { title: "供应商", key: "suppliername", sortable: true },
        { title: "供货地址", key: "address", editable: true },
        { title: "需入库仓库", key: "Storename" },
        { title: "入库仓库地址", key: "storeaddress" },
        { title: "操作员", key: "name" },
        { title: "建表时间", key: "Intime" },
        { title: "状态", key: "state" },
        {
          title: "详细信息",
          key: "details",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleSearchDetails(params.row.groupid);
                    }
                  }
                },
                "查看明细"
              )
            ]);
          }
        },
        {
          title: "Handle",
          key: "handle",
          button: [
            (h, params, vm) => {
              if (params.row.state == "未导入") {
                return h(
                  "Poptip",
                  {
                    props: {
                      confirm: true,
                      title: "你确定要导入吗?"
                    },
                    on: {
                      "on-ok": () => {
                        this.handleImport(params);
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {}
                      },
                      "导入仓库"
                    )
                  ]
                );
              }
            }
          ]
        }
      ],
      tableData: [],
      arrayindex: []
    };
  },
  methods: {
    handleImport(params) {
      importProduct(params.row.groupid, params.row.storeid).then(res => {
        this.$Message.success("导入成功");
        this.reload();
      });
      console.log(params.row);
    },
    handleSearchDetails(groupid) {
      let routeData = this.$router.resolve({
        name: "details_page",
        query: { groupid: groupid }
      });
      window.open(
        routeData.href,
        "_blank",
        "toolbar=yes, width=600, height=600"
      );
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getProductGroup(this.$store.state.user.userId).then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
