// user-service.js

// import UserModel from './user-model'

import UserModel from '../models/UserModel.js'
import BaseService from './BaseService.js'

class UserService extends BaseService {
	constructor () {
		super()
		this.model = new UserModel()
	}

	/**
     * 测试
     * @returns {Promise<{}>}
     */
	async getUsers (params) {
		const res = await this.model.getList(params)
		return res
	}

	async getUserById (id) {
		// const user = await this.model.query(id)
		// if (!user) throw new Error('User not found')
		const user = { 'name': '张三', age: 26, id }
		return user
	}

	async insertUser (body) {
		const result = await this.model.insert('INFO', body)
		return result
	}
}

export default UserService
