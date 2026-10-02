import axios from 'axios'

//axios拦截器处理请求，注册两个回调函数
//config，请求的配置参数
axios.interceptors.request.use(function(config){
    // 每次请求之前把token传进去
    const token = localStorage.getItem("token")
    // Bearer持票人认证（标准写法）：Authorization: Bearer <token>，读取时以空格分隔
    config.headers.Authorization = `Bearer ${token}`

    return config
},function(error){
    //向上抛出错误
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
    console.log(response.headers)

    // 解构出authorization并存入localStorage
    const {authorization} = response.headers
    // 如果authorzaition有值才执行
    authorization && localStorage.setItem("token",authorization)

    return response
},function(error){
    // 解析错误码
    const {status} = error.response
    if(status===401){
        localStorage.removeItem("token")
        // 设置浏览器当前地址栏的 URL
        window.location.href = '#/login'
    }
    return Promise.reject(error)
})