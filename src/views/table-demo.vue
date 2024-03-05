<template>
  <base-query-page ref="basePageQueryRef">
    <template #query>
      <el-form :model="basePageQueryRef.queryForm" inline>
        <el-form-item label="送样编号">
          <el-input placeholder="送样编号" />
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input placeholder="生产厂家" />
        </el-form-item>
        <el-form-item label="材料规格">
          <el-select>
            <el-option label="材料规格1" value="1"></el-option>
            <el-option label="材料规格2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="basePageQueryRef.handleQueryForm">查询</el-button>
          <el-button @click="basePageQueryRef.handleResetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #column>
      <el-table-column align="center" label="序号" type="index" width="65px"></el-table-column>
      <el-table-column prop="name" align="center" label="送样编号"></el-table-column>
      <el-table-column prop="email" align="center" label="生产厂家" />
      <el-table-column prop="datetime" align="center" label="产品批次号"></el-table-column>
      <el-table-column prop="name" align="center" label="规格型号"></el-table-column>
      <el-table-column prop="name" align="center" label="样品数量"></el-table-column>
      <el-table-column prop="name" align="center" label="检验结果"></el-table-column>
    </template>
  </base-query-page>
</template>
<script setup>
const queryForm = ref({
  name: '',
});

const basePageQueryRef = ref({ queryForm });
</script>
