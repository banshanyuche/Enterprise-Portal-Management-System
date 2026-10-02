// 保存后端查询审核过的登陆用户信息供前端页面使用

import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
    username?: string
    gender?: number
    introduction?: string
    avatar?: string
    role?: number
}

export const userInformationStore = defineStore('userInfo', () => {
    var userInfo = ref<UserInfo>({})

    function changeUserInfo(value: {}) {
        // 将获取的新的用户信息拼接进原有之中
        userInfo.value = {
            ...userInfo.value,
            ...value
        }
    }

    function clearUserInfo(){
        userInfo.value = {}
    }

    return {userInfo,changeUserInfo,clearUserInfo}
},{
    persist:true
})

export default userInformationStore