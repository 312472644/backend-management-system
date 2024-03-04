import { defineAsyncComponent } from 'vue';

const components = import.meta.glob('@/components/**/*.vue', { eager: true, import: 'default' });

export default {
  install: app => {
    if (components) {
      for (const [key, modules] of Object.entries(components)) {
        let name = getComponentName(key);
        // 默认注册组件Index.vue
        if (name.indexOf('index') !== -1) {
          name = name.replace('/index', '');
          app.component(name, defineAsyncComponent(modules));
        }
      }
    }
  },
};

function getComponentName(path) {
  return path.replace(/^\.\/(.*)\.\w+$/, '$1');
}
