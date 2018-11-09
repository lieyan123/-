<template>
  <div>
    <Card>
      <tables highlight-row ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-selection-change="handleSelectChange" />
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Button style="margin: 10px;" type="primary" @click="handleBanList">禁用所选</Button>
      <Button style="margin: 10px;" type="primary" @click="handleOpenList">启用所选</Button>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { deleteTableData, deleteTableList } from "@/api/data";
import { getUsersData, banUser,banUserList,openUserList } from "@/api/user";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { type: "selection" },
        { title: "用户id", key: "userid", sortable: true },
        { title: "姓名", key: "name", editable: true },
        { title: "密码", key: "password" },
        { title: "权限", key: "access" ,
        filters: [
                            {
                                label: 'user',
                                value: 'user'
                            },
                            {
                                label: 'admin',
                                value: 'admin'
                            },
                            {
                                label: 'super_admin',
                                value: 'super_admin'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.access.indexOf(value) > -1;
                        }
        
        },
        {
          title: "账户状态",
          key: "state",
          width: 150,
          align: "center",
          render: (h, params) => {
            if(params.row.state=='启用'){
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
                      this.handleBanUser(params);
                    }
                  }
                },
                params.row.state
              )
            ]);
            }
            else{
              return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleBanUser(params);
                    }
                  }
                },
                params.row.state
              )
            ]);
            }
          }
        }
      ],
      tableData: [],
      arrayindex: []
    };
  },
  methods: {
    handleBanUser(params) {
      banUser(params.row.userid, params.row.state).then(res => {
        getUsersData().then(res => {
          this.tableData = res.data;
        });
        this.$Message.success("操作成功");
      });
    },
    handleBanList(){
        banUserList(this.arrayindex).then(res => {
        //由于不知道如何重新渲染，只能重新请求一次数据使表格自动更新
        getUsersData().then(res => {
          this.tableData = res.data;
        });
        this.$Message.success("禁用成功");
      });
    },
    handleOpenList(){
        openUserList(this.arrayindex).then(res => {
        getUsersData().then(res => {
          this.tableData = res.data;
        });
        this.$Message.success("启用成功");
      });
    },
    handleSelectChange(selection) {
      this.arrayindex = [];
      for (let i = 0; i < selection.length; i++) {
        this.arrayindex.push(selection[i].userid);
      }
      console.log(this.arrayindex);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getUsersData().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
