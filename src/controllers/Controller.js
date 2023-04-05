import Router from '../routers/Router.js'
import UserController from './UserController.js'
import AdminController from './AdminController.js'

/**
 * 实例化控制器并获取路由
 * 每新增一个controller在构造函数里new一个
 */
class Controller extends Router {
    constructor () {
        super()
    }

    static getAllRouter () {
        // console.log([
        //     new UserController().getRouter(),
        //     new AdminController().getRouter()
        // ])
        return [
            new UserController().getRouter(),
            new AdminController().getRouter()
        ]
    }
}

export default Controller
