<!-- Login.vue -->
<template>
    <div id="login-container">
        <!--粒子库-->
        <vue-particles id="tsparticles" :options="particleOptions" />
        <!-- 登陆表单 -->
        <div class="formContainer">
            <h3>企业门户网站管理系统</h3>

            <!-- status-icon:校验时显示成功/错误图像反馈 -->
            <!-- :rules:校验规则，定义每个字段的验证逻辑 -->
            <!-- label-width:字符串长度 -->
            <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules" label-width="80px" class="loginForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import userInformationStore from '../store/userInformation'
import getterRouterStore from '../store/getterRouter'

//粒子库
const particleOptions = reactive({
    background: {
        color: { value: '#0d47a1' } // 背景色
    },
    //帧率限制
    fpsLimit: 120,
    //交互
    interactivity: {
        events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
            //窗口缩放自适应
            resize: true
        },
        modes: {
            push: { quantity: 4 },
            repulse: { distance: 200, duration: 0.4 }
        }
    },
    //粒子配置
    particles: {
        color: { value: '#ffffff' },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            //连线透明度
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 4,
            //超出边界处理方法
            //bounce：弹回，out：从另一侧弹回，destroy：消失，none：不管
            outModes: { default: 'bounce' }
        },
        number: { value: 80 },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 5 } }
    },
    //高清屏配置
    detectRetina: true
} as any)

//数据绑定
const loginForm = reactive({
    username: "",
    password: ""
})

//拿到ref引用对象进行校验
const loginFormRef = ref()

//校验规则
const loginRules = reactive({
    //required:是否为必填项
    //trigger:'blur':触发器，失去焦点进行校验
    //        'change':内容改变进行校验
    username: [{required: true,message:"请输入用户名", trigger: 'blur'}],
    password:[{required:true,message:"请输入密码",trigger:'blur'}]
})

//获取当前路由
const route = useRouter()

const submitForm = ()=>{
    // 1.校验表单
    //validate：触发表单的整体校验
    //valid:boolean参数，表示通过与否
    loginFormRef.value.validate((valid:any)=>{
        console.log(valid)
        if(valid){
            // console.log(loginForm)
            
            //向后端发送请求，但会遭到浏览器的同源策略的拦截，在vite-config.ts中进行代理
            //向后端发送请求，传输loginform表单作为用户信息，返回校验结果
            axios.post('/adminapi/user/login',loginForm as any).then(res=>{
                console.log(res.data)
                //登陆成功
                if(res.data.ActionType==="OK"){
                    // console.log(res.data.data)

                    // 存入后端controller返回的用户的信息
                    let userStore = userInformationStore()
                    let store = getterRouterStore()
                    userStore.changeUserInfo(res.data.data)
                    store.changeGetterRouter(false)
                    route.push('/index')
                }else{
                    ElMessage.error('用户名和密码不匹配')
                }
            })
        }
    }) 
}
</script>

<style scoped>
    .formContainer{
        width:500px;
        height:300px;
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        background: rgba(147, 142, 142, 0.274);
        color:white;
        text-align: center;
        padding:20px;
    }

    h3{
        font-size: 30px;
    }
    
    .loginForm{
        margin-top:20px
    }

    /* 深度选择 */
    :v-deep(.el-form-item__label){
        color:white;
    }
</style>