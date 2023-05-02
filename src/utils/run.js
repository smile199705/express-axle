import os from 'os'

class Run {

	/**
     * 启动端口错误捕捉
     * @param error
     */
	static onError (error) {
		if (error?.syscall !== 'listen') {
			throw error
		}
		switch (error.code) {
		case 'EACCES':
			console.error('port requires')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error('port is already be used')
			process.exit(1)
			break
		default:
			throw error
		}
	}

	/**
     * 获取真实IP地址
     * @returns {*}
     */
	static getIpAddress () {
		const interfaces = os.networkInterfaces()
		for (const devName in interfaces) {
			let iface = interfaces[devName]
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i]
				// console.log(alias, '========')
				// 真实地址
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					return alias.address
				}
			}
		}
	}
}

export default Run
