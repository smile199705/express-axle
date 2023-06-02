// import stream from 'stream'
// import TableService from '../services/TableService.js'
import MessageSocketServer from './MessageSocketServer.js'

/**
 * webSocket服务
 * 要求： 1、客户端发送websocket消息要为json对象格式， 例如： { "type": "message", "text": "test-123" }
 * 参数含义： type：表示消息类型，是message消息，还是heartbeat心跳检测消息； test：'-'前面为房间号，后面为单页面传的参数
 */
export default class WebSocketServer {

	constructor () {
		this.io = null
		this.heartbeatInterval = 20000
		this.connections = {}
		this.lastMessageTime = {}
		this.heartbeatTimers = {}
		// this.service = new TableService()
		this.messageSocketServer = new MessageSocketServer()
	}

	start (io) {
		this.io = io
		// Handle incoming connection requests
		this.io.on('request', (request) => {
			this.handleRequest(request)
		})

		// // Accept connection request
		// const connection = request.accept(null, request.origin)
		// const clientId = request.remoteAddress + ':' + connection.socket.remotePort
		// // Record connection time and client ID
		// const connectionTime = new Date().getTime()
		// this.connections[clientId] = { connection, connectionTime }
		//
		// // Send initial message to client
		// connection.sendUTF(JSON.stringify({ type: 'message', text: 'server has been connected!' }))
		//
		// // Start heartbeat timerx`
		// this.startHeartbeat(clientId)
		// // 将客户端连接放入集合
		// this.connections.add({ connection })
		//
		// // 监听消息
		// connection.on('message', (message) => {
		//     // 针对单页面
		//     // if (message.type === 'utf8' && message?.utf8Data && message?.utf8Data.includes('-')) {
		//     //     const data = message?.utf8Data.split('-')
		//     //     const events = data[0]
		//     //     const params = data[1]
		//     //
		//     //     // test 连接事件
		//     //     if (events === 'test') {
		//     //         setInterval(async () => {
		//     //             const res = await this.service.getUsers(params)
		//     //             connection.sendUTF('test-' + JSON.stringify(res))
		//     //         }, 1000)
		//     //     }
		//     // }
		// })
		//     // 监听连接关闭
		//     connection.on('close', () => {
		//         this.io.close()
		//     })
		//     // 监听心跳，防止连接中断
		//     // connection.on('broadcast', () => {
		//     //
		//     // })
		// })
		// this.io.on('connection', (socket) => {
		//     console.log('WebSocket connection established!')
		//     socket.on('message', (message) => {
		//         // 定时发送心跳
		//         setInterval(() => {
		//             // socket.emit('heartbeat')
		//             this.broadcast('')
		//         }, 30000)
		//         console.log(`WebSocket received message: ${message}`)
		//     })
		//     socket.on('power', () => {
		//         setInterval(async () => {
		//             const result = this.service.getUserById(1)
		//             // 将查询结果封装成可读流
		//             const readStream = new stream.Readable({ objectMode: true })
		//             // eslint-disable-next-line max-nested-callbacks
		//             result.forEach((row) => {
		//                 readStream.push(row)
		//             })
		//             readStream.push(null)
		//             // 实时推送查询结果给客户端
		//             readStream.pipe(socket.emit('power'))
		//         })
		//     })
		//     socket.on('error', (err) => {
		//         if (err.code === 'ECONNRESET') {
		//             console.warn('Client connection reset')
		//             socket.emit('error', err)
		//         } else {
		//             console.error('Unexpected error')
		//             socket.disconnect()
		//         }
		//     })
		//     socket.on('disconnect', () => {
		//         console.log('WebSocket connection closed!')
		//     })
		// })
		// this.io.on('connection', this.handleConnection.bind(this))
	}

	// handleConnection (socket) {
	//     console.log(`A client with ID ${socket.id} connected`)
	//     this.connections.add(socket)
	//     socket.on('disconnect', this.handleDisconnect.bind(this, socket))
	// }
	// handleDisconnect (socket) {
	//     console.log(`Client with ID ${socket.id} disconnected`)
	//     this.connections.delete(socket)
	// }
	// broadcast (event, data) {
	//     this.connections.forEach(socket => {
	//         socket.emit(event, data)
	//     })
	// }
	// broadcast (message) {
	//     this.io.emit('message', message)
	// }

	handleRequest (request) {
		console.log('Client connected from ' + request.remoteAddress)

		const connection = request.accept(null, request.origin)
		// const clientId = request.remoteAddress + ':' + connection.socket.remotePort
		// console.log(clientId, '============')
		// const connectionTime = new Date().getTime()
		// this.connections[clientId] = { connection, connectionTime }
		// connection.sendUTF(JSON.stringify({ type: 'message', text: 'Welcome!' }))
		console.log('客户端连接建立成功')
		connection.sendUTF('服务端发送消息已建立连接')
		// this.startHeartbeat(clientId)
		// connection.on('message', (message) => this.handleMessage(message, clientId, connection))
		connection.on('message', (message) => this.handleMessage(message, connection))
	}

	// Start heartbeat timer for client
	startHeartbeat (clientId) {
		const connection = this.connections[clientId].connection
		let heartbeatTimer = setInterval(() => {
			const currentTime = new Date().getTime()
			const timeSinceLastMessage = currentTime - this.lastMessageTime[clientId]
			if (timeSinceLastMessage > this.heartbeatInterval) {
				console.log(`Client ${clientId} timed out`)
				clearInterval(heartbeatTimer)
				delete this.connections[clientId]
				connection.close()
			} else {
				connection.sendUTF(JSON.stringify({ type: 'heartbeat' }))
			}
		}, this.heartbeatInterval)
		this.heartbeatTimers[clientId] = heartbeatTimer
	}

	handleMessage (message, connection) {
		console.log(`Received message : ${message?.utf8Data}`)
		if (message.type === 'utf8') {
			// const data = JSON.parse(message?.utf8Data)
			let events
			let params
			// switch (data.type) {
			//     case 'message':
			if (message?.utf8Data?.includes('-')) {
				const item = message?.utf8Data?.split('-')
				events = item[0]
				params = item[1]
			}
			this.messageSocketServer.handleMessageData(events, params, connection)
			// break
			// case 'heartbeat':
			//     this.handleHeartbeat(clientId)
			//     break
			// default:
			//     console.log('Unknown message type: ' + data.type)
			// }
		}
	}

	// handleHeartbeat (clientId) {
	//     this.lastMessageTime[clientId] = new Date().getTime()
	// }
}
