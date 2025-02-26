import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "node:url";
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      dts: './src/types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        {
          axios: [
            ['default', 'axios']
          ]
        },
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      dts: './src/types/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "components": fileURLToPath(new URL("./src/components", import.meta.url)),
    },
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
});
