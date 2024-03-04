function getPageName(path) {
  const pageName = path.split('/views');
}

export function chunkBuild() {
  return {
    name: 'chunkBuild',
    config(config) {
      return {
        ...config,
        build: {
          chunkSizeWarningLimit: 500,
          rollupOptions: {
            output: {
              entryFileNames: 'index[hash].js',
              manualChunks: function (id) {
                if (id.includes('node_modules/lodash-es')) return 'chunks/lodash-es';
                if (id.includes('node_modules/@vue')) return 'chunks/vue';
                if (id.includes('node_modules')) {
                  return `chunks/${id
                    .toString()
                    .split('node_modules/')[1]
                    .split('/')[0]
                    .toString()}`;
                }
                if (id.includes('src/api')) {
                  return 'api/index';
                }
                if (id.includes('src/hooks')) {
                  return 'hooks/index';
                }
                if (id.includes('src/utils')) {
                  return 'utils/index';
                }
              },
              assetFileNames: function (assetInfo) {
                const { name } = assetInfo;
                if (name.endsWith('svg')) {
                  return 'assets/svg/[name].[ext]';
                }
                if (name.endsWith('css')) {
                  return 'assets/styles/[name].[ext]';
                }
                if (['png', 'jpg', 'jpeg', 'gif', 'webp'].some(ext => name.endsWith(ext))) {
                  return 'assets/images/[name].[ext]';
                }
                if (['eot', 'ttf', 'woff', 'woff2'].some(ext => name.endsWith(ext))) {
                  return 'assets/fonts/[name].[ext]';
                }
                return 'assets/[name].[ext]';
              },
              chunkFileNames: function (chunkInfo) {
                const { facadeModuleId } = chunkInfo;
                // svg 图标
                if (facadeModuleId?.endsWith('svg')) {
                  return `assets/svg/[name].js`;
                }
                // 组件打包
                if (
                  ['src/components', 'src/views/components'].some(prefix =>
                    facadeModuleId?.includes(prefix)
                  )
                ) {
                  return `components/[name]-[hash].js`;
                }
                // 页面
                if (facadeModuleId?.includes('/views')) {
                  return `views/[name]-[hash].js`;
                }
                return `js/[name]-[hash].js`;
              },
            },
          },
        },
      };
    },
  };
}
