import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Product from '@/views/Product.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import New from '@/views/New.vue'

const routes = [
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path:'/news',
    name:'news',
    component:News
  },
  {
    path:'/news/:id',
    name:'new',
    component:New
  },
  {
    path:'/product',
    name:'product',
    component:Product
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 加载进度条
router.beforeEach((to,from,next)=>{
  NProgress.start()
  next()
})
router.afterEach(()=>{
  NProgress.done()
})

export default router
