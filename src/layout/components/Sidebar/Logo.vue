<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 v-else class="sidebar-title">
        {{ title }}
      </h1>
    </router-link>
    <router-link v-else key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script setup>
import logo from '@/assets/logo/node-mascot.svg';

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const title = ref(import.meta.env.VITE_APP_TITLE);
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $nav-bar-height;
  line-height: $nav-bar-height;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #f8f8f9;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 8px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $title-color;
      font-weight: 600;
      line-height: 50px;
      font-size: 13px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
