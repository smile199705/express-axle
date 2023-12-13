import Model from './Model.js'

class UserModel extends Model {
	constructor () {
		super()
	}

	async getUsers (params) {
		console.log(params, '%%%%%%')
		// return {
		// 	id: 5678,
		// 	name: params
		// }
		const sql = 'select * from INFO'
		let result
		try {
			result = await this.findOne(sql)
		} catch (e) {
			console.log(e, '$$$$$$$', params)
		}
		return result
	}

	async getList () {
		const sql = 'select * from INFO'
		const con = 'select count(*) total from INFO'
		const result = await this.findAndCount(sql, con)
		return result
	}
}

export default UserModel
