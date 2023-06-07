express-axle
---
## 简介
express-axle是一个基于express框架封装的面向对象业务框架，并集成websocket通讯功能，使开发人员直接注重于业务开发
> 项目采用pkg进行打包交付，避免源代码泄露 

该框架在设计和使用上，通过集成三方中间件实现功能的扩展

## 设计原则
* 约定大于配置
* 配置业务分离

## 应用目录
```bash
.
├── README.md
├── configMap.json
├── package-lock.json
├── package.json
├── public
├── src
│   ├── app.js
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routers
│   ├── services
│   ├── utils
│   └── websocket
└── test
```
> configMap.json为配置文件；<br/>dist为es6规范转为commonjs规范之后的源代码；<br/>lib目录为pkg打包后的文件，可直接运行；<br/>src为源代码

##### 安装
`npm install`
##### 普通启动/热启动/pm2热启动/babel编译/babel编译后启动
`npm start dev  /  npm run start:dev  /  pm2 start app.js --watch / npm start compile / npm start dev_dist `

###### pkg打包
```shell
1、主服务打包： 修改package.json的bin为"./dist/app.js"， 并更正pkg下script内容为"dev_dist"
2、websocket服务：修改package.json的bin为"./dist/websocket.js"， 并更正pkg下script内容为"dev_socket_dist"
分别通过npm run build 进行打包

```
