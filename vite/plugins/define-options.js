import DefineOptions from 'unplugin-vue-define-options/vite';

/**
 *
 * @returns 自定义选项,这里主要用来声明setup中的props,比如组件名称(方便在vue-devtools中查看)
 */
export function defineOptions() {
  return DefineOptions();
}
