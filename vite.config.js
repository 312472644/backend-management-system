import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import createVitePlugins from './vite/plugins/index';

export default defineConfig(({ mode, command }) => {
  // 区分开发生产环境
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins(env, command === 'build', mode),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "./src/assets/styles/variables.scss" as *;
          @use "./src/assets/styles/element/index.scss" as *;`,
        },
      },
    },
    server: {
      host: true,
      open: true,
      port: 3000,
      proxy: {
        '/dev-api': {
          target: 'http://192.168.100.129:8087',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, ''),
        },
      },
    },
  };
});
