<template>
  <div>
    <base-query-layout>
      <template #query>
        <el-form inline>
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #btn>
        <el-button type="primary" :icon="Plus">新增</el-button>
      </template>
      <template #body>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="400"
          :page-size="10"
          style="margin-top: 16px"
        />
      </template>
    </base-query-layout>
  </div>
</template>
<script setup>
import { Plus } from '@element-plus/icons-vue';

const form = reactive({
  name: '',
});
const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
]);
</script>
