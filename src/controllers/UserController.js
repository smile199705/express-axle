import Response from '../utils/response.js'
import Router from '../routers/Router.js'
import UserService from '../services/UserService.js'
// import TableService from '../services/TableService.js'

class UserController extends Router {
	constructor () {
		super()
		this.userService = new UserService()
		console.log(this.userService, '@@@@@@@')
		// 添加路由处理函数和中间件
		this.addRouteHandler('GET', '/users', this.getUsers.bind(this))
		this.addRouteHandler('POST', '/users/insert', this.insertUser.bind(this))
	}

	async getUsers (req, res) {
		const { params } = req.query
		try {
			const users = await this.userService.getUsers(params)
			Response.success(res, users)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async getUserById (req, res) {
		// 建议或者提倡在controller层进行参数解构
		const { id } = req.params
		try {
			const user = await this.userService.getUserById(id)
			Response.success(res, user)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async insertUser (req, res) {
		// 建议或者提倡在controller层进行参数解构
		const body = req.body
		try {
			const user = await this.userService.insertUser(body)
			Response.success(res, user)
		} catch (err) {
			Response.error(res, err)
		}
	}
}

export default UserController
