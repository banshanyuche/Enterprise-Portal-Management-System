// HTTP错误对象
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 把请求里的 Cookie 解析成对象
var cookieParser = require('cookie-parser');
// 终端打印请求日志
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter')
const ProductRouter = require('./routes/admin/ProductRouter')
const JWT = require('./util/JWT');

var app = express();

// 模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//中间件，请求日志、解析json请求体，解析表单请求体、解析cookie、静态文件服务
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 全局中间件，没一个请求到达服务之前都会执行全局中间件函数
// 解析token值
app.use((req,res,next)=>{
  // 如果token有效继续执行，过期则返回401错误
  if(req.url==='/adminapi/user/login'){
    next()
    return
  }

  // ["authorization"]写法，同.authoriaztion
  // 如果属性名里有 -、空格、数字开头等不符合变量命名规则的字符，只能用方括号
  // authorization中为bearer <token>,有空格
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    var payload = JWT.verify(token)

    // 如果token有效进行校验，未过期则重新赋予token，过期则返回401
    if(payload){
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})

// /adminapi/* 后台系统
app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
