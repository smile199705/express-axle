import Response from '../utils/response.js'
import Router from '../routers/Router.js'
import UserService from '../services/UserService.js'
// import UserService from '../services/UserService.js'

class UserController extends Router {
	constructor () {
		super()
		// console.log(option, '$$$$$$$$$$$$$$')
		// this.userController = option
		// this.service = new UserService()
		// console.log(service, '这是userController中的serivce实例')
		this.userService = new UserService()
		console.log(this.userService, 'userService.......')
		// console.log(option.userService.model.getUsers(), 'userController..........')
		// 添加路由处理函数和中间件
		this.addRouteHandler('GET', '/users', this.getUsers.bind(this))
		// this.addRouteHandler('GET', '/users/:id', this.getUserById.bind(this))
		// this.addRouteHandler('POST', '/users', this.createUser.bind(this))
		// this.addRouteHandler('PUT', '/users/:id', this.updateUser.bind(this))
		// this.addRouteHandler('DELETE', '/users/:id', this.deleteUser.bind(this))
		// this.addMiddleware(this.authMiddleware.bind(this))
	}

	async getUsers (req, res) {
		const { params } = req.query
		try {
			// console.log(this.userService, 'userService.......')
			const users = await this.userService.getUsers(params)
			console.log(users, '###########')
			Response.success(res, users)
		} catch (err) {
			Response.error(res, err.message, 500)
		}
	}

	async getUserById (req, res) {
		// 建议或者提倡在controller层进行参数解构
		const { id } = req.params
		try {
			const user = await this.userService.getUserById(id)
			Response.success(res, user)
		} catch (err) {
			Response.error(res, err.message, 404)
		}
	}
}

export default UserController
