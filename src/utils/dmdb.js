import dmdb from 'dmdb'
import nconf from 'nconf'

nconf.argv().env().file({ file: 'configMap.json' })

/**
 * 先创建连接池，后连接
 */
class DmDb {
	constructor () {
		this.pool = {}
	}

	// 创建连接池
	async createPool () {
		try {
			console.log(nconf.get('db')?.url, '============')
			this.pool = await dmdb.createPool({
				connectString: nconf.get('db')?.url,
				outFormat: dmdb.OUT_FORMAT_OBJECT,
				poolMax: 6000,
				poolMin: 1,
				maxWait: 5000, // 连接等待时间
				poolTimeout: 8 // 单位秒
			})
		} catch (e) {
			throw new Error('createPool error: ' + e.message)
		}
	}

	async getConnection () {
		return await this.pool.getConnection()
	}
}

export const db = new DmDb()
