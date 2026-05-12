// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineNuxtConfig({
  app: {
    head: {
      title: '博客空间',

      meta: [
        {
          name: 'description',
          content: '前端开发者的梦境'
        },

        {
          name: 'keywords',
          content: 'Nuxt3, Vue3, 前端, 博客'
        }
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ]
    }
  },
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  alias: {
    '@': rootDir,
    '~': rootDir
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  build: {
    transpile: ['naive-ui', 'vueuc']
  },
  vite: {
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()]
      }),

      AutoImport({
        imports: ['vue'],
        dts: true
      })
    ]
  }
})
