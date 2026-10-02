import { createRouter, createWebHashHistory } from 'vue-router'
//.同级目录 ..上一级目录 ../..上两级目录
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import { getterRouterStore } from '../store/getterRouter.ts'
import NotFound from '../views/notfound/NotFound.vue'
import userInformationStore from '../store/userInformation.ts'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mainbox',
        name: 'mainbox',
        component: MainBox
        //mainbox嵌套路由根据*权限*动态添加
    },
    //初次进入网页，重定向默认进入index
    {
        path: '/',
        redirect: '/index'
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//每个路由跳转之前进行路由拦截，进行权限判断
//to:目标路由对象
//from:来源路由对象
//放行使用return true
//"_"开头的参数默认忽略
router.beforeEach((to, _from) => {
    //如果请求登陆页面则放行
    if (to.name === 'login') {
        return true
    } else {
        //如果授权（登陆过） next（)
        //未授权责重定向到登录页面
        if (!localStorage.getItem('token')) {
            //中断跳转
            return { path: '/login' }
        } else {
            //如果第一次访问，进行登陆判断，在加载路由
            //但是如果是第二次，就没必要再重新加载，需要进行判断

            //获取到一个reactive的仓库实例对象
            //必须放在函数里懒加载，放在顶部pinia还没被注册，会发生错误
            let iscreate = getterRouterStore()

            if (!iscreate.isGetterRouter) {
                // 在重新添加路由之前删除原有路由，防止管理员->编辑出现权限显示问题
                router.removeRoute("mainbox")

                //登陆后先添加路由，在跳转到指定页面 
                ConfigRouter()
                return {
                    path: to.fullPath,
                    replace: true
                }
                //跳转到请求的完整路径
            } else {
                return true
            }

        }
    }
})

//遍历路由数组,添加动态路由，方便权限控制
const ConfigRouter = () => {

    // 添加mainbox路由
    if (!router.hasRoute("mainbox")) {
        router.addRoute({
            path: '/mainbox',
            name: 'mainbox',
            component: MainBox
            //mainbox嵌套路由根据*权限*动态添加
        })
    }

    RoutesConfig.forEach(item => {
        checkPermission(item) && router.addRoute("mainbox", item)
    })

    //对于其他不符合的请求，进行404提示
    router.addRoute('mainbox', {
        //“：”：声明为动态参数，pathMatch参数名，(.*)正则表达式，*重复多次
        path: '/:pathMatch(.*)*',
        name: 'mainbox-404',
        component: NotFound
    })

    let iscreate = getterRouterStore()
    //改变isGetterRouter = true
    iscreate.changeGetterRouter(true)
}

// 角色权限检查
const checkPermission = (item: any) => {
    const userStore = userInformationStore()
    if (item.requireAdmin) {
        return userStore.userInfo.role === 1
    }
    return true
}

export default router