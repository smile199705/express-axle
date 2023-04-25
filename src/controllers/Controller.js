import Router from '../routers/Router.js'
import UserController from './UserController.js'
import MenuController from './MenuController.js'
// import { createContainer, asClass } from 'awilix'
import MenuModel from '../models/MenuModel.js'
import MenuService from '../services/MenuService.js'
import UserModel from '../models/UserModel.js'
import UserService from '../services/UserService.js'

/**
 * 实例化控制器并获取路由
 * 每新增一个controller在构造函数里new一个
 */
class Controller extends Router {
    constructor () {
        super()
    }

    static getAllRouter () {
        // 创建容器并注册 Service 和 Model
        // const container = {
        //     services: {},
        //     register (name, serviceConstructor, dependencies = []) {
        //         const resolvedDependencies = dependencies.map(dep => container.resolve(dep))
        //         // eslint-disable-next-line new-cap
        //         const serviceInstance = new serviceConstructor(...resolvedDependencies)
        //         this.services[name] = serviceInstance
        //     },
        //     resolve (name) {
        //         return this.services[name]
        //     }
        // }
        //
        // container.register('menuModel', MenuModel)
        // container.register('menuService', MenuService, ['menuModel'])

        // 创建容器并注册 Service 和 Model
        // const container = createContainer()
        //
        // container.register({
        //     menuController: asClass(MenuController).scoped(),
        //     menuModel: asClass(MenuModel).scoped(),
        //     menuService: asClass(MenuService).scoped(),
        //     userController: asClass(UserController).scoped(),
        //     userModel: asClass(UserModel).scoped(),
        //     userService: asClass(UserService).scoped()
        // })
        // const userModel = new UserModel()
        // console.log(userModel, 'userModel。。。。。。。。')
        // const userService = new UserService(userModel)
        // console.log(userService, 'userService。。。。。。。。')
        // const userController = new UserController(userService)
        // console.log(userController, 'userController..........')
        //
        // const menuModel = new MenuModel()
        // console.log(menuModel, 'menuModel。。。。。。。。')
        // const menuService = new MenuService(menuModel)
        // console.log(menuService, 'menuService。。。。。。。。')
        // const menuController = new MenuController(userService)
        // console.log(menuController, 'MenuController..........')

        return [
            new UserController().getRouter(),
            // new AdminController().getRouter(),
            new MenuController().getRouter()
        ]
    }
}

export default Controller
