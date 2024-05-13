import BaseService from './BaseService.js'
import { Id } from '../utils/utils.js'
import ScreenModel from '../models/ScreenModel.js'


class ScreenService extends BaseService {
	constructor () {
		super()
		this.model = new ScreenModel()
	}

	/**
	 * 创建大屏接口
	 * @param name
	 * @returns {Promise<*>}
	 */
	async createScreen (name) {
		return await this.model.createScreen(Id, name)
	}

	async getScreenList (isDelete, pageSize, pageNum) {
		const res = await this.model.getScreenList(isDelete, pageSize, pageNum)
		return res
	}

	async deleteScreen (id) {
		return await this.model.deleteScreen(id)
	}

	async updateName (id, name) {
		return await this.model.updateName(id, name)
	}

	async restoreScreen (id) {
		return await this.model.restoreScreen(id)
	}
}

export default ScreenService
