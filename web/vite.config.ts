import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],

    // 配置 @ 别名
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    // 解决跨域问题，反向代理
    server: {
        proxy: {
            '/webapi': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
})