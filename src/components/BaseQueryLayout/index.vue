<template>
  <div class="query-layout">
    <div v-if="hasQuerySlot" class="query-container">
      <slot name="query"></slot>
    </div>
    <div class="body" :class="{ 'no-query': !hasQuerySlot }">
      <div class="btn-operation-box">
        <slot name="btn"></slot>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup>
defineOptions({ name: 'QueryLayout' });

defineProps({});

const hasQuerySlot = computed(() => useSlots().query !== undefined);
</script>
<style scoped lang="scss">
.query-layout {
  .query-container {
    padding: 16px 16px 0;
    background: #ffffff;
    border-radius: 3px;
    border-bottom: 10px solid $main-bg-color;

    :deep {
      .el-form-item__label {
        font-weight: normal;
      }

      .el-form-item {
        margin-bottom: 16px;
      }
    }
  }

  .body {
    padding: 16px;
    background: #ffffff;
    border-radius: 3px;

    &.no-query {
      margin-top: 0;
    }
  }

  .btn-operation-box {
    margin-bottom: 8px;
  }

  :deep {
    .el-pagination {
      display: flex;
      justify-content: flex-end;
    }

    .btn-operation {
      margin-bottom: 16px;
    }
  }
}
</style>
