const log = console.log

export function start_printf (port, ipAddress) {
	log(' 🚀 express-axle....     启动了... 🙏 ')
	log()
	log(`              http://${ipAddress}:${port}/`)
	log()
}

export function dm_log () {
	log('dmdb connection pool successful')
}

export function dm_connection_fail (e) {
	log('dmdb connection pool fail', e)
}
