var createError = require('http-errors'); // 创建 HTTP 错误对象
var express = require('express');   // 引入 Express 框架
var path = require('path');     // 路径处理模块
var cookieParser = require('cookie-parser'); // 处理 cookie 的中间件
var logger = require('morgan'); // HTTP 请求日志记录中间件
const mongoose = require('mongoose');   // MongoDB ODM 库
//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();  //创建了一个 Express 应用实例，这个实例 app 就代表你整个网站 / 后端服务器。

// 🔧 配置 IP、端口等
const config = {
  ip: '192.168.1.49',
  port: 3001,
  mongoPort: 27017,
  dbName: 'testdb'
};
//集成 Swagger 接口文档
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API 文档',
      version: '1.0.0',
      description: 'Node + Express 项目自动生成的接口文档',
    },
    servers: [
      {
        url: `http://${config.ip}:${config.port}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // 扫描 routes 下所有 js 文件里的注释
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 启动监听
app.listen(config.port, () => {
  console.log(`服务启动  http://${config.ip}:${config.port}`);
  console.log(`Swagger文档地址  http://${config.ip}:${config.port}/api-docs`);
});
// MongoDB 连接
mongoose.connect(`mongodb://${config.ip}:${config.mongoPort}/${config.dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('MongoDB 连接成功'))
    .catch(err => console.error('MongoDB 连接失败:', err));
//设置视图模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//中间件注册
app.use(logger('dev'));                           // 日志中间件
app.use(express.json());                          // 解析 JSON 请求体
app.use(express.urlencoded({ extended: false })); // 解析 URL 编码请求体
app.use(cookieParser());                          // 解析 cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源路径
//注册路由
app.use('/', indexRouter);     // 主路由
app.use('/users', usersRouter); // 用户相关接口
//404 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});
//通用错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
//导出 app
module.exports = app;