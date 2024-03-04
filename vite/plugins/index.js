import vue from '@vitejs/plugin-vue';

import createAutoImport from './auto-import';
import createSvgIcon from './svg-icon';
import createCompression from './compression';
import { defineOptions } from './define-options';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import { gitFlowInfo } from 'vite-build-git-info';
import { chunkBuild } from './chunk-build';
import ElementPlusStyles from 'unplugin-element-plus/vite';
import eslintPlugin from 'vite-plugin-eslint';

export default function createVitePlugins(viteEnv, isBuild = false, mode) {
  const vitePlugins = [vue()];
  // 自动引入
  vitePlugins.push(...createAutoImport());
  // svg图标
  vitePlugins.push(createSvgIcon(isBuild));
  // 定义全局变量
  vitePlugins.push(defineOptions());
  // 按需引入element-plus样式
  vitePlugins.push(ElementPlusStyles({}));
  // eslint
  vitePlugins.push(eslintPlugin({ include: ['./src/**/*.{vue,js,ts}'] }));
  if (isBuild) {
    // chunk打包
    vitePlugins.push(chunkBuild());
    // 进度条
    vitePlugins.push(progress({ clearLine: true }));
    // 压缩
    vitePlugins.push(...createCompression(viteEnv));
    vitePlugins.push(gitFlowInfo());
  }
  if (mode === 'analyzer') {
    vitePlugins.push(visualizer({ open: false, filename: 'visualizer.html' }));
  }
  return vitePlugins;
}
