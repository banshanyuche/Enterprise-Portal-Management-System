import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//粒子库插件
import Particles from '@tsparticles/vue3' 
import { loadSlim } from '@tsparticles/slim'
// pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Home from './views/home/Home.vue'
import './util/axios.config'


const app = createApp(App)
const pinia=createPinia()

app.use(pinia)
// 防止访问index时路由未加载，提前加载index页面
router.addRoute('mainbox', { path: '/index', component: Home })
app.use(router)   
pinia.use(piniaPluginPersistedstate) 
app.use(ElementPlus)
app.use(Particles, { // 3. 注册并初始化
    init: async (engine) => {
        await loadSlim(engine) // 加载引擎
    },
})


app.mount('#app')            