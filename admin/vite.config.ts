import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 解决跨域问题，反向代理
  server:{
    proxy:{
      '/adminapi':{
        target:'http://localhost:3000',
        // 将请求头中的origin改为目标地址
        changeOrigin:true
      }
    }
  }
})
