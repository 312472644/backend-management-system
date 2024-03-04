import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';

export default function createAutoImport() {
  return [
    Icons({compiler: 'vue3'}),
    autoImport({ imports: ['vue', 'vue-router', 'pinia'], dts: false, resolvers: [ElementPlusResolver()] }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ];
}
