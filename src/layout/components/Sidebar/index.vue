<template>
  <div class="sidebar-container" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar class="menu-scrollbar" :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
<style lang="scss" scoped>
.sidebar-container {
  ::v-deep {
    .el-menu-item {
      position: relative;
      color: $textContentColor !important;
      &.is-active {
        background-color: #f0faff !important;
        color: $primaryColor !important;
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: #2d8cf0;
        }
      }
    }
    .el-sub-menu {
      .el-sub-menu__title {
        color: $textContentColor !important;
      }
    }
    .el-menu--vertical .el-menu-item {
      height: auto;
      line-height: auto;
    }
  }
}
</style>
<style lang="scss">
.el-popper {
  border: none !important;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.el-menu--vertical {
  .el-menu--popup {
    min-width: 150px !important;
  }
  .el-menu-item {
    height: 33px;
    line-height: 33px;
    color: $textContentColor !important;
    font-size: 14px !important;
    padding: 7px 16px;
    &.is-active {
      background-color: $menuHoverColor !important;
      color: $primaryColor !important;
    }
  }
}
</style>
