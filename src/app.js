// app.js
import express from 'express'
import createError from 'http-errors'
import nconf from 'nconf'
nconf.argv().env().file({ file: 'configMap.json' })
import morgan from 'morgan'
import Run from './utils/run.js'
import Controller from './controllers/Controller.js'
import { dm_connection_fail, dm_log, start_printf } from './utils/start_printf.js'
import { db } from './utils/dmdb.js'

class App {
	constructor () {
		this.app = express()
		this.PORT = nconf.get('port') ?? 8080
		this.ipAddress = Run.getIpAddress() ?? '127.0.0.1'
	}

	async start () {
		try {
			this.setUpMiddleware()
			this.setUpRoutes()
			this.startServer()
			process.on('error', Run.onError)
		} catch (error) {
			console.error(error)
			process.exit(1)
		}
	}

	setUpMiddleware () {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
		this.app.all('*', function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Headers', 'X-Requested-With')
			res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
			res.header('X-Powered-By', ' 3.2.1')
			res.header('Content-Type', 'application/json;charset=utf-8')
			res.header('Pragma', 'no-cache')
			res.header('Expires', 0)
			next()
		})
		this.app.use(morgan('dev'))
	}

	setUpRoutes () {
		this.app.use('', Controller.getAllRouter())
		this.app.use((req, res, next) => {
			next(createError(404))
		})
        this.app.use((err, req, res, next) => { // eslint-disable-line
			console.error(err.stack)
			res.status(err.stack ?? 500).send(err.message ?? 'Internal Server Error')
		})
	}

	startServer () {
		this.app.listen(this.PORT)
	}
}

const app = new App()
app.start().then(() => {
	db.createPool()
		.then(() => dm_log())
		.catch((e) => dm_connection_fail(e))
	start_printf(app.PORT, app.ipAddress)
}).catch((e) => {
	console.error(e)
	process.exit(1)
})

/**
 * 监听未捕获的异常
 */
process.on('uncaughtException', (error) => {
	console.log('uncaughtException', error)
})

/**
 * 监听Promise没有被捕获的失败函数
 */
process.on('unhandledRejection', (error) => {
	console.log('unhandledRejection', error)
})
