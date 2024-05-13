import Model from './Model.js'

class ScreenModel extends Model {
	constructor () {
		super()
	}

	async createScreen (id, name) {
		let result
		try {
			result = await this.insert('SCREEN_INFO', {
				ID: id,
				NAME: name
			})
		} catch (e) {
			console.log(e, '$$$$$$$', result)
		}
		return result
	}


	async getScreenList (isDelete, pageSize = 0, pageNum = 10) {
		// const sql = `select * from SCREEN_INFO`
		// console.log(is_delete, 'ssssssss')
		const sql = 'select * from SCREEN_INFO WHERE IS_DELETE = ? LIMIT ?, ?'
		// const count = `select count(*) total from SCREEN_INFO`
		const count = 'select count(*) total from SCREEN_INFO WHERE IS_DELETE = ?'
		return await this.findAndCount(sql, count, [isDelete, pageNum, pageSize], [isDelete])
	}

	async deleteScreen (id) {
		const sql = 'update SCREEN_INFO set IS_DELETE = 1 where ID = ?'
		return await this.sqlQuery(sql, [id])
	}

	async updateName (id, name) {
		const sql = 'update SCREEN_INFO set NAME = ? where ID = ?'
		return await this.sqlQuery(sql, [name, id])
	}

	async restoreScreen (id) {
		const sql = 'update SCREEN_INFO set IS_DELETE = 0 where ID = ?'
		return await this.sqlQuery(sql, [id])
	}
}

export default ScreenModel
