// https://nuxt.com/docs/api/configuration/nuxt-config

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
    compatibilityDate: '2026-05-13',

    runtimeConfig: {
        supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
        public: {
            supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL
        }
    },

    ssr: true,
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    devtools: {
        enabled: true
    },

    app: {
        head: {
            title: '博客空间',

            meta: [
                {
                    name: 'description',
                    content: '前端开发者的梦境'
                },

                {
                    property: 'og:title',
                    content: '博客空间'
                },

                {
                    property: 'og:description',
                    content: '前端开发者的梦境'
                },

                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                }
            ],

            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon.ico'
                }
            ]
        }
    },

    css: ['~/assets/css/main.css'],

    modules: [
        'nuxtjs-naive-ui', // 启用官方模块
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt'
    ],

    build: {
        transpile: ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@css-render/core']
    },

    vite: {
        ssr: {
            noExternal: [
                'naive-ui',
                'vueuc',
                'date-fns',
                'date-fns-tz',
                '@css-render/core',
                '@css-render/vue3-ssr'
            ]
        },
        optimizeDeps: {
            include: [
                '@vicons/ionicons5',
                'naive-ui',
                'vueuc',
                'date-fns',
                'date-fns-tz'
            ]
        },

        plugins: [
            Components({
                dts: './components.d.ts',

                dirs: ['components'],

                resolvers: [NaiveUiResolver()]
            }),

            AutoImport({
                imports: ['vue'],
                dts: './auto-imports.d.ts'
            })
        ]
    }
})
