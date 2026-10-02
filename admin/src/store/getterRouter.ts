import { defineStore } from 'pinia'
import { ref } from 'vue'

export const getterRouterStore = defineStore('isGetterRouter', () => {
   
    let isGetterRouter = ref(false)

    function changeGetterRouter(value: boolean) {
        isGetterRouter.value = value
    }

    return {
        isGetterRouter, changeGetterRouter
    }
})
export default getterRouterStore

