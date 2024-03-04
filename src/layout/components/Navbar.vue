<template>
  <div class="navbar" :data-is-full-screen="isFullScreen">
    <hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!settingsStore.topNav" /> -->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav" />
    <div class="right-menu flex flex-end">
      <div class="menu-item">
        <el-icon size="20" title="全屏" @click="handleFullScreen" color="#808695">
          <FullScreen />
        </el-icon>
      </div>
      <div class="avatar-container menu-item">
        <el-dropdown @command="handleCommand" class="hover-effect right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img :src="userStore.avatar" class="user-avatar" />
            <span class="avatar-name">{{ userStore.name || '-' }}</span>
            <el-icon><caret-bottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <router-link to="/user/profile">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link> -->
              <!-- <el-dropdown-item command="setLayout">
                <span>布局设置</span>
              </el-dropdown-item> -->
              <el-dropdown-item command="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { CaretBottom, FullScreen } from '@element-plus/icons-vue';
// import Breadcrumb from '@/components/Breadcrumb';
import TopNav from '@/components/TopNav';
import Hamburger from '@/components/Hamburger';
import useAppStore from '@/store/modules/app';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import { requestFullScreen, exitFullScreen } from '@/utils';

const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const isFullScreen = ref(false);

function toggleSideBar() {
  appStore.toggleSideBar();
}

function handleCommand(command) {
  switch (command) {
    case 'setLayout':
      setLayout();
      break;
    case 'logout':
      logout();
      break;
    default:
      break;
  }
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = '/index';
      });
    })
    .catch(() => {});
}

const emits = defineEmits(['setLayout']);
function setLayout() {
  emits('setLayout');
}

function handleFullScreen() {
  if (isFullScreen.value) {
    exitFullScreen();
  } else {
    requestFullScreen();
  }
  isFullScreen.value = !isFullScreen.value;
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $nav-bar-height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: calc(#{$nav-bar-height} - 4px);
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $nav-bar-height;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      &:not(:last-child) {
        margin-right: 20px;
      }
      &:hover {
        cursor: pointer;
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .avatar-name {
          color: $textContentColor;
          font-size: 13px;
          padding: 0 5px;
        }

        .user-avatar {
          cursor: pointer;
          margin-right: 3px;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        i {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
