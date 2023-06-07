import Response from '../utils/response.js'
import Router from '../routers/Router.js'
import MenuService from '../services/MenuService.js'

class MenuController extends Router {
	constructor () {
		super()
		this.menuService = new MenuService()
		// 添加路由处理函数和中间件
		this.addRouteHandler('GET', '/menu', this.getMenu.bind(this))
	}

	async getMenu (req, res) {
		const { params } = req.query
		try {
			const users = await this.menuService.getMenu(params)
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
