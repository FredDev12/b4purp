import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/app/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: 'public/index.html'  // Specify the path to your entry file if it's not in the root
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_OPTIONS_API__: true, // Pour activer l'API Options
    __VUE_PROD_DEVTOOLS__: false,
  },
})
