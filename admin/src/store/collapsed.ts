import { defineStore } from 'pinia'
import { ref } from 'vue'

export const collapsedStore = defineStore('isCollapsed', () => {
    let isCollapsed = ref(false)

    function changeCollapsed() {
        isCollapsed.value = !isCollapsed.value
    }

    return {isCollapsed,changeCollapsed}
},{
    persist:true
})

export default collapsedStore