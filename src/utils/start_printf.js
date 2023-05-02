import chalk from 'chalk'

const log = console.log

export function start_printf (port, ipAddress) {
	log(chalk.greenBright.bold(' 🚀 express-axle....     启动了... 🙏 '))
	log()
	log(chalk.greenBright.bold(`              http://${ipAddress}:${port}/`))
	log()
}

export function dm_log () {
	log(chalk.green.bold('dmdb connection pool successful'))
}

export function dm_connection_fail (e) {
	log(chalk.red.bold('dmdb connection pool fail'), e)
}
