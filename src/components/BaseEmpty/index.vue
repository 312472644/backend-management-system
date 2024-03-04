<template>
  <div class="empty-container">
    <img :src="imgSrc" :style="getImgStyle" alt="" />
    <div v-if="hasSlot">
      <slot></slot>
    </div>
    <div v-else class="empty-text">
      <span v-if="!hasEmptySlot">{{ emptyText }}</span>
      <slot v-else name="empty"> </slot>
    </div>
  </div>
</template>
<script setup>
import emptyImg from '@/assets/images/empty.svg';
import { useSlots } from 'vue';

defineOptions({
  name: 'Empty',
});

const props = defineProps({
  defaultImg: {
    type: String,
    default: emptyImg,
  },
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  imageWidth: {
    type: String,
    default: '100px',
  },
  imageHeight: {
    type: String,
    default: '100px',
  },
});

const slots = useSlots();
const imgSrc = computed(() => {
  return props.defaultImg;
});

const getImgStyle = computed(() => {
  return {
    width: props.imageWidth,
    height: props.imageHeight,
  };
});

const hasSlot = computed(() => !!slots.default);
const hasEmptySlot = computed(() => slots.empty);
</script>
<style lang="scss" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  .empty-text {
    color: $subColor;
    font-size: 14px;
  }
}
</style>
