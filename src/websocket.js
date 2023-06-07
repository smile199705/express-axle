
import nconf from 'nconf'
nconf.argv().env().file({ file: 'configMap.json' })
global.cc = nconf.get()
import express from 'express'
import Run from './utils/run.js'
import { server as Server } from 'websocket'
import WebSocketServer from './websocket/WebSocketServer.js'
import { db } from './utils/dmdb.js'
import { dm_connection_fail, dm_log, start_printf } from './utils/start_printf.js'


class WebSocket {
	constructor () {
		this.app = express()
		this.websocketServer = new WebSocketServer()
		this.PORT = nconf.get('port_socket') ?? 8081
		this.ipAddress = Run.getIpAddress() ?? '127.0.0.1'
	}

	async start () {
		try {
			this.startServer()
			process.on('error', Run.onError)
		} catch (error) {
			console.error(error)
			process.exit(1)
		}
	}

	startServer () {
		const server = this.app.listen(this.PORT)
		const io = new Server({ httpServer: server, autoAcceptConnections: false })
		this.websocketServer.start(io)
	}
}

const socket = new WebSocket()

socket.start().then(() => {
	db.createPool()
		.then(() => dm_log())
		.catch((e) => dm_connection_fail(e))
	start_printf(socket.PORT, socket.ipAddress)
}).catch((e) => {
	console.error(e)
	process.exit(1)
})


