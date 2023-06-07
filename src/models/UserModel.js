import Model from './Model.js'

class UserModel extends Model {
	constructor () {
		super()
	}

	async getUsers (params) {
		console.log(params)
		// return {
		// 	id: 5678,
		// 	name: params
		// }
		const sql = 'select * from INFO'
		const result = await this.findOne(sql)
		console.log(typeof result, '#########')
		return result
	}

	async getList () {
		const sql = 'select * from INFO'
		const con = 'select count(*) total from INFO'
		const result = await this.findAndCount(sql, con)
		console.log(result, '$$$$$$$$')
		return result
	}
}

export default UserModel
