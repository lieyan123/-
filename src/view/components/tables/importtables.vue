<template>
  <div>
    <Row :gutter="14" style="margin: 10%px  ">
      <i-col span="20">
        <Card>
          <Form :model="formItem" label-position="left" :label-width="100">
            <FormItem label="供应商">
              <Select v-model="formItem.select1" filterable @on-open-change="handleSupplier" @on-change="Savesup">
                <Option v-for="item in formItem.supplierList" :value="item.supplierid+','+item.suppliername+','+item.address" :key="item.supplierid">{{ item.suppliername }}</Option>
              </Select>
            </FormItem>
            <FormItem label="供应商地址">
              <Input v-model="formItem.input1" disabled></Input>
            </FormItem>
            <FormItem label="货物选择">
              <Select v-model="formItem.select2" filterable multiple @on-open-change="handleProduct" @on-change="Savetable">
                <Option v-for="item in formItem.productList" :value="item" :key="item.productid">{{ item.productname }}</Option>
              </Select>
            </FormItem>
            <FormItem label="进货单时间">
              <Row>
                <Col span="10">
                <DatePicker type="date" placeholder="Select date" v-model="formItem.date" disabled></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="进货单表">
              <tables highlight-row ref="tables" editable searchable search-place="top" v-model="formItem.tableData" :columns="formItem.columns" />
            </FormItem>
            <FormItem style="text-align:center">
            <Button type="primary" @click="submit">提交进货单</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tables from "_c/tables";
import store from "@/store";
import { getProduct, getSuppliersData,submitForm } from "@/api/product";
export default {
  inject:['reload'],
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      formItem: {
        input1: "",
        select1: "",
        select2: [],
        date: new Date(),
        columns: [
          { title: "货物id", key: "productid", sortable: true },
          { title: "货名", key: "productname", editable: true },
          { title: "功能描述", key: "description" },
          { title: "数量", key: "number" ,editable: true},
        ],
        supplierList: [],
        productList: [],
        tableData: []
      },
      supplieritem: [],
      arrbefore : []
    };
  },
  methods: {
    handleProduct() {
      getProduct().then(res => {
        this.formItem.productList = res.data
      });
    },
    handleSupplier() {
      getSuppliersData().then(res => {
        this.formItem.supplierList = res.data
      });
    },
    Savesup(value) {
      this.supplieritem = value.split(",")
      this.formItem.input1 = this.supplieritem[2]
    },
    Savetable(value) {
      this.formItem.tableData = value;
    },
    submit(){
        if(this.formItem.tableData.length==0){
          this.$Message.error("请添加表单数据");
        }else{
            submitForm(this.$store.state.user.userId,this.supplieritem[0],this.formItem.date,this.formItem.tableData).then(res => {
              this.$Message.success("提交进货单成功");
              this.reload()
          })
        }
      

    }
  },
  mounted() {}
};
</script>

<style>
</style>
