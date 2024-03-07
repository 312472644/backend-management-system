<template>
  <div class="base-query-page">
    <base-query-layout>
      <!--表单查询插槽-->
      <template v-if="hasQuerySlot" #query>
        <slot name="query"></slot>
      </template>
      <!--操作按钮插槽-->
      <template #btn>
        <slot name="btn"></slot>
      </template>
      <template #body>
        <el-table v-bind="$attrs" v-loading="tableLoading" :data="tableData">
          <!--表格列插槽-->
          <slot name="column"></slot>
        </el-table>
        <el-pagination
          v-if="showPage"
          v-bind="$attrs"
          style="margin-top: 16px"
          background
          v-model:current-page="pageVO.current"
          v-model:page-size="pageVO.size"
          layout="prev, pager, next, jumper, total"
          :total="100 || dataTotal"
          :page-size="[10, 20, 30, 40]"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </template>
    </base-query-layout>
    <!--默认插槽-->
    <slot></slot>
  </div>
</template>
<script setup>
import { usePageQuery } from '@/hooks/usePageQuery';
import { computed } from 'vue';

defineOptions({
  name: 'BaseQueryPage',
});

const slots = useSlots();
// 导出查询表单对象
const queryForm = ref({});

const props = defineProps({
  // 接口查询地址
  url: {
    type: String,
    // TODO 待删除
    default: 'https://mock.mengxuegu.com/mock/65e708228ecfd33cdfbd688d/grace/random-data',
  },
  // 是否展示分页
  showPage: {
    type: Boolean,
    default: true,
  },
  // 额外查询参数，默认参数为form表单
  extraParams: {
    type: Object,
    default: () => {},
  },
});

const { methods, data } = usePageQuery({
  url: props.url,
  queryForm: queryForm.value,
  extraParams: props.extraParams,
  showPage: props.showPage,
});

const {
  handleResetForm,
  handleQueryForm,
  getTableData: _getTableData,
  handlePageChange,
  handleSizeChange,
} = methods;
const { tableData, tableLoading, pageVO, dataTotal } = data;

const getTableData = pageNo => {
  pageVO.value.current = pageNo || pageVO.value.current;
  _getTableData();
};

const hasQuerySlot = computed(() => !!slots.query);

onMounted(() => getTableData());

defineExpose({
  getTableData,
  queryForm,
  handleResetForm,
  handleQueryForm,
});
</script>
