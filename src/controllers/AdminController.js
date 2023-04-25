import Response from '../utils/response.js'
// import UserService from './user-service'
import UserService from '../services/UserService.js'
import Router from '../routers/Router.js'

class AdminController extends Router {
	constructor () {
		super()
		this.service = new UserService()

		// 添加路由处理函数和中间件
		this.addRouteHandler('GET', '/admin/users', this.getUsers.bind(this))
		// this.addRouteHandler('GET', '/admin/:id', this.getUserById.bind(this))
	}

	async getUsers (req, res) {
		const { params } = req.query
		try {
			const users = await this.service.getUsers(params)
			Response.success(res, users)
		} catch (err) {
			Response.error(res, err.message, 500)
		}
	}

	async getUserById (req, res) {
		try {
			const user = await this.service.getUserById(req.params.id)
			Response.success(res, user)
		} catch (err) {
			Response.error(res, err.message, 404)
		}
	}

	async createUser (req, res) {
		try {
			await this.service.createUser(req.body)
			Response.success(res, { message: 'User created successfully' })
		} catch (err) {
			Response.error(res, err.message, 400)
		}
	}

	async updateUser (req, res) {
		try {
			await this.service.updateUser(req.params.id, req.body)
			Response.success(res, { message: 'User updated successfully' })
		} catch (err) {
			Response.error(res, err.message, 400)
		}
	}

	async deleteUser (req, res) {
		try {
			await this.service.deleteUser(req.params.id)
			Response.success(res, { message: 'User deleted successfully' })
		} catch (err) {
			Response.error(res, err.message, 400)
		}
	}
}

export default AdminController
