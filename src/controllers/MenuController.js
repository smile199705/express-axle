import Response from '../utils/response.js'
// import UserService from './user-service'
// import UserService from '../services/UserService.js'
import Router from '../routers/Router.js'
// import MenuModel from '../models/MenuModel.js'
// import MenuService from '../services/MenuService.js'
// import Model from '../models/Model.js'
// import MenuModel from '../models/MenuModel.js'
// import MenuService from '../services/MenuService.js'
// import container from '../utils/container.js'
import MenuService from '../services/MenuService.js'

class MenuController extends Router {
	constructor () {
		super()
		// this.service = new MenuService()
		this.menuService = new MenuService()
		console.log(this.menuService, 'menuService.......')
		// console.log(this.menuService, '############')
		// 添加路由处理函数和中间件
		// console.log(this.service, '!!!!!!!!!!!!!!!!!')
		this.addRouteHandler('GET', '/menu', this.getMenu.bind(this))
		// this.addRouteHandler('GET', '/users', this.getUserById.bind(this))
		// this.addRouteHandler('POST', '/users', this.createUser.bind(this))
		// this.addRouteHandler('PUT', '/users/:id', this.updateUser.bind(this))
		// this.addRouteHandler('DELETE', '/users/:id', this.deleteUser.bind(this))
		// this.addMiddleware(this.authMiddleware.bind(this))
	}

	async getMenu (req, res) {
		const { params } = req.query
		try {
			// console.log(this.menuService, '$$$$$$$$$$$$$$$$$', '!!!!!!!')
			const users = await this.menuService.getMenu(params)
			// console.log(users, '###########')
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

export default MenuController
