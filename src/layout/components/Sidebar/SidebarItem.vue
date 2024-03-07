<template>
  <div v-if="!item.hidden">
    <!--子节点-->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :popper-class="{ 'dark-theme': sideTheme === 'dark' }"
        >
          <svg-icon
            v-if="isChildNode"
            className="custom-svg-icon"
            :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          />
          <template #title>
            <span
              class="menu-title"
              :class="{ 'submenu-node': !isChildNode }"
              :title="hasTitle(onlyOneChild.meta.title)"
              >{{ onlyOneChild.meta.title }}</span
            >
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <!--父节点-->
    <el-sub-menu
      v-else
      ref="subMenu"
      :popper-class="`${sideTheme === 'dark' ? 'dark-theme' : ''} `"
      :index="resolvePath(item.path)"
    >
      <template v-if="item.meta" #title>
        <svg-icon className="custom-svg-icon" :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="index"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { isExternal } from '@/utils/validate';
import AppLink from './Link';
import { getNormalPath } from '@/utils/global';
import useSettingsStore from '@/store/modules/settings';

const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
});

const onlyOneChild = ref({});

const isChildNode = computed(() => {
  const icon = onlyOneChild.value.meta.icon || props.item.meta?.icon;
  if (icon) {
    return icon !== '#';
  }
  return icon;
});

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
}

function resolvePath(routePath, routeQuery) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return { path: getNormalPath(props.basePath + '/' + routePath), query: query };
  }
  return getNormalPath(props.basePath + '/' + routePath);
}

function hasTitle(title) {
  if (title.length > 5) {
    return title;
  } else {
    return '';
  }
}
</script>
<style lang="scss" scoped>
.submenu-node {
  padding-left: 25px;
}

.custom-svg-icon {
  width: 20px;
  height: 20px;
}

.submenu-title-noDropdown {
  height: auto !important;
  line-height: 33px !important;

  ::v-deep .el-menu-tooltip__trigger {
    padding: 0 !important;
    position: relative !important;
  }
}
</style>
