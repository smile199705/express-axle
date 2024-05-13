import Response from '../utils/response.js'
import Router from '../routers/Router.js'
import ScreenService from '../services/ScreenService.js'

class ScreenController extends Router {
	constructor () {
		super()
		this.screenService = new ScreenService()
		// 添加路由处理函数和中间件
		// 新建大屏
		this.addRouteHandler('POST', '/screen/create', this.createScreen.bind(this))
		this.addRouteHandler('GET', '/screen/getList', this.getScreenList.bind(this))
	}

	async createScreen (req, res) {
		const { name } = req.body
		try {
			const users = await this.screenService.createScreen(name)
			Response.success(res, users)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async getScreenList (req, res) {
		let { isDelete, pageSize, pageNum } = req.query
		try {
			const list = await this.screenService.getScreenList(isDelete, pageSize, pageNum)
			Response.success(res, list)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async deleteScreen (req, res) {
		let { id } = req.query
		try {
			const result = await this.screenService.deleteScreen(id)
			Response.success(res, result)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async updateName (req, res) {
		let { id, name } = req.query
		if (!id) {
			return Response.error(id, '更新大屏id不存在')
		}
		try {
			const result = await this.screenService.updateName(id, name)
			Response.success(res, result)
		} catch (err) {
			Response.error(res, err)
		}
	}

	async restoreScreen (req, res) {
		let { id } = req.query
		try {
			const result = await this.screenService.restoreScreen(id)
			Response.success(res, result)
		} catch (err) {
			Response.error(res, err)
		}
	}

}

export default ScreenController
