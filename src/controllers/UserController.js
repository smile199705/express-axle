import Response from '../utils/response.js'
// import UserService from './user-service'
import UserService from '../services/UserService.js'
import Router from '../routers/Router.js'

class UserController extends Router {
    constructor () {
        super()
        this.service = new UserService()

        // 添加路由处理函数和中间件
        this.addRouteHandler('GET', '/users', this.getUsers.bind(this))
        this.addRouteHandler('GET', '/users/:id', this.getUserById.bind(this))
        // this.addRouteHandler('POST', '/users', this.createUser.bind(this))
        // this.addRouteHandler('PUT', '/users/:id', this.updateUser.bind(this))
        // this.addRouteHandler('DELETE', '/users/:id', this.deleteUser.bind(this))
        // this.addMiddleware(this.authMiddleware.bind(this))
    }

    async getUsers (req, res) {
        const { params } = req.params
        try {
            const users = await this.service.getUsers(params)
            Response.success(res, users)
        } catch (err) {
            Response.error(res, err.message, 500)
        }
    }

    async getUserById (req, res) {
        // 建议或者提倡在controller层进行参数解构
        const { id } = req.params
        try {
            const user = await this.service.getUserById(id)
            Response.success(res, user)
        } catch (err) {
            Response.error(res, err.message, 404)
        }
    }
}

export default UserController
