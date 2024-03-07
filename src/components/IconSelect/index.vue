<template>
  <div class="icon-body">
    <el-input
      v-model="iconName"
      style="position: relative"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input="filterIcons"
    >
      <template #suffix><i class="el-icon-search el-input__icon" /></template>
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <svg-icon :icon-class="item" style="height: 30px; width: 30px" />
        <span style="padding-left: 5px">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import icons from './requireIcons';

const iconName = ref('');
const iconList = ref(icons);
const emit = defineEmits(['selected']);

function filterIcons() {
  iconList.value = icons;
  if (iconName.value) {
    iconList.value = icons.filter(item => item.indexOf(iconName.value) !== -1);
  }
}

function selectedIcon(name) {
  emit('selected', name);
  document.body.click();
}

function reset() {
  iconName.value = '';
  iconList.value = icons;
}

defineExpose({
  reset,
});
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;

  .icon-list {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    height: 200px;
    overflow-y: auto;

    div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    span {
      fill: currentcolor;
      overflow: hidden;
    }
  }
}
</style>
