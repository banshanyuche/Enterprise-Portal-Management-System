<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu></Menu>
            </el-icon>
            <span style="margin-left: 10px;">企业门户网站管理系统</span>
        </div>

        <div class="right">
            <span style="margin-right: 10px;">欢迎 {{userInformation.userInfo.username}} 回来</span>

            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="30" color="white">
                        <user></user>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </el-header>
</template>

<script setup>
import { collapsedStore } from '../../store/collapsed.ts'
import { Menu } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import userInformationStore from '../../store/userInformation.ts'

const store = collapsedStore()
const router = useRouter()
const userInformation = userInformationStore()

const handleCollapsed = () => {
    store.changeCollapsed()
}

const handleCenter = ()=>{
    router.push('/center')
}
const handleLogout = ()=>{
    localStorage.removeItem("token")
    userInformation.clearUserInfo()
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-header{
    background: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,.right{
    display: flex;
}

.left{
    i{
        margin: auto;
        cursor: pointer;
    }
}

.right{
    .el-dropdown{
        margin:auto;
    }
}
</style>