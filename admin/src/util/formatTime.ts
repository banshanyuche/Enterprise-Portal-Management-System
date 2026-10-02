import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' 

dayjs.locale('zh-cn')

const formatTime = {
    getTime:(date:any)=>{
         return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
}

export default formatTime