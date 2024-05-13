import Response from '../utils/response.js'
import { db } from '../utils/dmdb.js'
import dmdb from 'dmdb'

class Model {
	constructor () {}

	/**
     * 查询(内部使用)
     * @param sql
     * @param arr
     * @returns {Promise<*>}
     */
	async executes (sql, arr = []) {
		try {
			const conn = await db.pool.getConnection()
			return await conn.execute(sql, arr, { outFormat: dmdb.OUT_FORMAT_OBJECT })
		} catch (e) {

		}
	}

	/**
     * 查询语句返回一条数据
     * @param sql sql语句
     * @param arr 默认空数组
     * @returns {Promise<object>}
     */
	async findOne (sql, arr = []) {
		try {
			// 返回为json对象, 例如：{ "id": 1, "age": 18 }
			const result = await this.executes(sql, arr)
			const list = JSON.parse(JSON.stringify(result?.rows))
			return { list }
		} catch (e) {
			Response.error(e, 'sql语句执行失败')
		}
	}

	/**
     * 查询语句返回满足条件的所有数据
     * @param sql sql语句
     * @param arr 默认空数组
     * @returns {Promise<array[object]>}
     */
	async findAll (sql, arr) {
		try {
			// 返回为json对象，例如：[{ "id": 1, "age": 18 }， { "id": 2, "age": 20 }]
			const result = await this.executes(sql, arr)
			const list = result && JSON.parse(JSON.stringify(result?.rows))
			return { list }
		} catch (e) {
			Response.error(e, 'sql语句执行失败')
		}
	}

	/** 查询语句并返回总的数据条数
     * @param sql_list 查询列表sql
     * @param sql_count 查询列表总数量sql，别名统一为 'total'， 保持系统一致
     * @param arr_list
     * @param arr_count
     * @returns {Promise<{total: (number|number), list: any}>} 返回结果为：
     * { list: [{ "id": "110", "age": 18 }, { "id": "110", "age": 18 }], total: 2 } 格式
     */
	async findAndCount (sql_list, sql_count, arr_list = [], arr_count = []) {
		console.log(sql_count, sql_list)
		try {
			const [result, count] = await Promise.all([
				this.executes(sql_list, arr_list),
				this.executes(sql_count, arr_count)
			])
			// console.log(result, '&&&&&&&')
			const list = result && JSON.parse(JSON.stringify(result?.rows))
			const total = parseInt(count?.rows[0]['total']) ?? +0
			return { list, total }
		} catch (e) {
			Response.error(e, 'sql语句执行失败')
			throw new Error('lllllllll')
			// console.log('sql执行失败', sql_list, sql_count, e)
		}
	}

	// 单条对象插入
	async insert (table, insert_obj, arr = []) {
		try {
			let sql = `INSERT INTO ${String(table)} (${Object.keys(insert_obj).toString()}) VALUES`
			const data1 = JSON.stringify(Object.values(insert_obj)).replace('[', '(').replace(']', ')').replaceAll('"', '\'')
			const data2 = data1.replace('[', '(').replace(']', ')')
			sql += ` ${data2}`
			const result = await this.executes(sql, arr)
			return result?.rowsAffected > 0 ? 'successful' : 'failed'
		} catch (e) {
			Response.error(e, 'sql插入语句执行失败')
		}
	}

	// 批量插入执行语句
	async insertMany (table, insert_arr, arr = []) {
		const key = Object.keys(insert_arr[0]).toString()
		let sql = `INSERT INTO ${String(table)} (${key}) VALUES `
		try {
			for (let i = 0; i < insert_arr.length; i++) {
				if (i === insert_arr.length - 1) {
					const data = JSON.stringify(Object.values(insert_arr[i])).replace('[', '(').replace(']', ')')
					sql += ` ${data}`
					break
				}
				const data = JSON.stringify(Object.values(insert_arr[i])).replace('[', '(').replace(']', ')')
				sql += ` ${data},`
			}
			const result = await this.executes(sql, arr)
			return result?.rowsAffected > 0 ? 'successful' : 'failed'
		} catch (e) {
			Response.error(e, 'sql批量插入语句执行失败', 500)
			// console.log('sql批量插入执行失败', sql, e)
		}
	}

	/**
     * sql执行
     * @param sql
     * @param arr
     * @returns {Promise<any>}
     */
	async sqlQuery (sql, arr = []) {
		const conn = await db.pool.getConnection()
		try {
			const result = await conn.execute(sql, arr, { outFormat: dmdb.OUT_FORMAT_OBJECT })
			return result && JSON.parse(JSON.stringify(result?.rows))
		} catch (e) {
			Response.error(e, 'sql语句执行失败')
			// console.log('sql执行失败', sql, e)
		}
	}


	/**
     * 老版本sql执行
     * @param sql
     * @param arr
     * @returns {Promise<*>}
     */
	// async query (sql, arr = []) {
	// 	let conn
	// 	try {
	// 		conn = await db.pool.getConnection()
	// 		const result = await conn.execute(sql, arr, { resultSet: true })
	// 		return result
	// 	} catch (e) {
	// 		Response.error(e, 'sql语句执行失败')
	// 		console.log('sql执行失败', sql, e)
	// 	} finally {
	// 		await conn.close()
	// 	}
	// }

	/**
     * 老版本sql执行
     * @param sql
     * @param arr
     * @returns {Promise<*>}
     */
	// async execute (sql, arr = []) {
	// 	let conn
	// 	try {
	// 		conn = await db.pool.getConnection()
	// 		const result = await conn.execute(sql, arr)
	// 		return result
	// 	} catch (e) {
	// 		Response.error(e, 'sql语句执行失败')
	// 		console.log('sql执行失败', sql, e)
	// 	} finally {
	// 		await conn.close()
	// 	}
	// }
}

export default Model
