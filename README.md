express-axle
---
## 简介
express-axle是一个基于express框架封装的满足业务的面向对象业务框架，使开发人员直接注重于业务开发

该框架在设计和使用上，通过集成三方中间件实现功能的扩展

## 设计原则
* 约定大于配置
* 依赖注入，控制反转
* 配置业务分离

## 应用目录
```bash
.
├── README.md
├── app.js                      // 启动文件
├── configMap.json              // 项目配置选项
├── controllers                 // 控制器入口
│   ├── Controller.js
│   ├── AdminController.js
│   └── UserController.js
├── dist
├── middleware
│   └── AuthMiddleware.js
├── models                      // 模型层
│   ├── Model.js
│   └── UserModel.js
├── package-lock.json           // npm版本包锁定
├── package.json                // npm包管理
├── routers                     // 路由处理
│   └── Routerss.js
├── services                    // service层,业务层
│   ├── BaseService.js
│   └── UserService.js
├── utils                       // 工具包
│   ├── common.js               // 公共参数
│   ├── dmdb.js                 // 达梦数据库连接
│   ├── response.js             // 统一响应处理
│   ├── run.js                  // 系统运行所需
│   └── start_printf.js         // 项目启动打印
└── websocket                   // webscoket实时消息推送服务
    └── WebSocketServer.js
```

##### 安装
`npm install`
##### 普通启动/热启动/pm2热启动
`npm start dev  /  npm run start:dev  /  pm2 start app.js --watch `
