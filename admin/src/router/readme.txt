对于用户管理模块的权限问题
管理员（role-1） 编辑（role-2）
仅有管理员能进行用户管理

权限控制
1.在sidemenu模块中不加入user-manage的选项，通过在dom元素上加上v-admin自定义指令实现
// 指令
const vAdmin = {
    // 挂载时获取dom节点
    mounted(el){
        console.log(el)
        if(userStore.userInfo.role!==1){
            el.parentNode.removeChild(el)
        }
    }
}

2.仅完成1，仍能通过路径添加到路由，可通过checkPermission方法判断是否具有添加路由的权限
const checkPermission = (item: any) => {
    const userStore = userInformationStore()
    if (item.requireAdmin) {
        return userStore.userInfo.role === 1
    }
    return true
}

3.但从管理员->编辑的转变，不刷新的情况下，user-manage路由已经添加，仍能访问到路径，需要在每次重新添加路由之前清理干净已添加的路由
//login.vue，登陆成功后将路由是否配置设为否
store.changeGetterRouter(false)

//index.ts
router.removeRoute("mainbox")

4.在每次添加路由前也得把mainbox重新加载上
// 添加mainbox路由
if (!router.hasRoute("mainbox")) {
    router.addRoute({
        path: '/mainbox',
        name: 'mainbox',
        component: MainBox
        //mainbox嵌套路由根据*权限*动态添加
    })
}

整体登录后流程
push('/index')
    ↓
beforeEach 拦截
    ↓
isGetterRouter === false（防止管理员退出登陆后未刷新就登陆编辑，不重新加载路由导致编辑可以访问到权限之外的路径）
    ↓
ConfigRouter() 添加路由
    ↓
return { path: '/index', replace: true }
    ↓
真正跳转