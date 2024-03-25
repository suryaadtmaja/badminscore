import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Badminton Score',
        short_name: 'Badminton Score',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'asset-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'asset-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'asset-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'asset-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    AutoImport({
      imports: ['vue'],
    }),
    Components,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
