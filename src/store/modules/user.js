import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/profile.jpg';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '未登录',
    avatar: '' || defAva,
    roles: [],
    userInfo: {},
    permissions: [],
    deptList: [],
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            let data = res.data;
            setToken(data.access_token);
            this.token = data.access_token;
            this.name = username;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            const user = res.user;
            const avatar = user.avatar == '' || user.avatar == null ? defAva : user.avatar;

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ['ROLE_DEFAULT'];
            }
            this.name = user.userName;
            this.avatar = avatar;
            this.userInfo = res.user?.dept;
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
