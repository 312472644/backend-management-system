<template>
  <div class="toggle-query">
    <slot name="show"> </slot>
    <slot v-if="showMore" name="hide"></slot>
    <slot></slot>
    <div class="toggle-text" @click="handleToggle">
      <el-link type="primary" :underline="false" size="small">
        {{ showMore ? '收起' : '展开' }}
        <el-icon v-if="showMore"><ArrowUp /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </el-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

defineOptions({
  name: 'ToggleQuery',
});

const showMore = ref(false);

const handleToggle = () => {
  showMore.value = !showMore.value;
};
</script>
<style lang="scss" scoped>
.toggle-query {
  .toggle-text {
    display: inline-block;
    vertical-align: super;
  }
}
</style>
