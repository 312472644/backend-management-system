import { createApp } from 'vue';
import App from './App.vue';
// 全局样式
import '@/assets/styles/index.scss';
import pinia from '@/store/index';
import router from '@/router/index';
// 注册指令
import directive from './directive';
// 注册插件
import plugins from './plugins';
// 权限控制(路由权限控制、按钮权限控制)
import './permission';
// 自定义业务组件
import businessComponents from './components';
// 图标
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon';
import elementIcons from '@/components/SvgIcon/svgicon';

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .use(elementIcons)
  .use(plugins)
  .use(businessComponents)
  .component('svg-icon', SvgIcon);
directive(app);
app.mount('#app');
