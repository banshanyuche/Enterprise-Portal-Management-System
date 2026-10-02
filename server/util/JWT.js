const jsonwebtoken = require("jsonwebtoken")

const secret = "chen"

const JWT = {
    //generate生成加密后token
    // value需加密的内容，secret密钥，exprires过期时间
    generate(value,expires){
        //sign：用来生成JWTtoken
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    //解密并验证token
    verify(token){
        try {
            return jsonwebtoken.verify(token,secret)
        } catch (e) {
            return false
        }
        
    }
}

const token = JWT.generate({name:"chen"},"10s")
console.log(JWT.verify(token))

setTimeout(() => {
    console.log(JWT.verify(token))
}, 11000);
module.exports = JWT