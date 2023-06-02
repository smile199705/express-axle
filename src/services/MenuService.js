import BaseService from './BaseService.js'
import MenuModel from '../models/MenuModel.js'


class MenuService extends BaseService {
	constructor () {
		super()
		this.model = new MenuModel()
		console.log(this.model, 'model.......')
	}

	/**
     * 测试
     * @returns {Promise<{}>}
     */
	async getMenu (params) {
		const res = await this.model.getMenu(params)
		return res
	}

	async getUserById (id) {
		// const user = await this.model.query(id)
		// if (!user) throw new Error('User not found')
		const user = { 'name': '张三', age: 26, id }
		return user
	}
}

export default MenuService
