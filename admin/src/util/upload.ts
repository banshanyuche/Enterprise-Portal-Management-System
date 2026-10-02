import axios from "axios"

function upload(path:any,userForm:any) {
    // 由于发送的内容中存在文件，创建一个表单供于提交
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i as keyof typeof userForm] as any)
    }
    // console.log(params)

    return axios.post(path, params, {
        // 需上传文件设置请求头内容类型
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res=>res.data)
}

export default upload