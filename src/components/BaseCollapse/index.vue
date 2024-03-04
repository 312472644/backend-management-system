<template>
  <div class="collapse-box" :class="{ shirk: isShrink }">
    <div class="left-collapse-panel" ref="leftPanelRef">
      <div class="fold" @click="handleClick" style="padding-top: 2px">
        <el-icon v-if="!isShrink" style="color: #fff"><ArrowRight /></el-icon>
        <el-icon v-else style="color: #fff"><ArrowLeft /></el-icon>
      </div>
      <div v-if="isShrink" class="overlay-mask"></div>
      <slot name="left"></slot>
    </div>
    <div class="right-collapse-panel" ref="rightPanelRef">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import { onMounted } from 'vue';

defineOptions({
  name: 'Collapse',
});

const emits = defineEmits(['collapse']);

const props = defineProps({
  // 收缩后的宽度
  shirkWidth: {
    type: Number,
    default: 16,
  },
  // 是否默认收缩
  isDefaultShrink: {
    type: Boolean,
    default: false,
  },
});

let initWidth = 0;
const isShrink = ref(false);
const leftPanelRef = ref(null);
const rightPanelRef = ref(null);

const handleClick = () => {
  isShrink.value = !isShrink.value;
  leftPanelRef.value.style.width = isShrink.value ? props.shirkWidth + 'px' : initWidth + 'px';
  rightPanelRef.value.style.width = `calc(100% - ${isShrink.value ? props.shirkWidth : initWidth}px)`;
  emits('collapse', isShrink.value);
};

const init = () => {
  if (props.isDefaultShrink) {
    isShrink.value = true;
    leftPanelRef.value.style.width = props.shirkWidth + 'px';
    rightPanelRef.value.style.width = `calc(100% - ${props.shirkWidth}px)`;
    return;
  }
  initWidth = leftPanelRef.value.clientWidth;
  leftPanelRef.value.style.width = initWidth + 'px';
  rightPanelRef.value.style.width = `calc(100% - ${initWidth}px)`;
};

onMounted(() => init());
</script>
<style lang="scss" scoped>
.collapse-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  &.shirk {
    .left-collapse-panel {
      overflow: hidden;
    }
  }
  .left-collapse-panel {
    position: relative;
    .fold {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      z-index: 999;
      background-color: #999;
      height: 50px;
      line-height: 50px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    .overlay-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $mainBgColor;
      z-index: 998;
    }
  }
}
</style>
