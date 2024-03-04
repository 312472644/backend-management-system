<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }" class="page-container">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component v-if="!route.meta.link" :is="Component" :key="route.path" />
        </keep-alive>
    </router-view>
    <iframe-toggle />
  </section>
</template>

<script setup>
import iframeToggle from './IframeToggle/index';
import useTagsViewStore from '@/store/modules/tagsView';

const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f5f7f9;
  // .page-container {
  //   min-height: calc(100vh - 104px);
  //   background: #fff;
  //   margin-bottom: 10px;
  // }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    padding: 0 10px;
    min-height: calc(100vh - 88px);
  }

  .fixed-header + .app-main {
    padding-top: 88px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>
