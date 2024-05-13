import ScreenModel from '../models/ScreenModel.js'

class MessageSocketServer {

	constructor () {
		this.userModel = new ScreenModel()
		this.clearTime = null
		this.clearTime1 = null
	}

	clearLoopTime () {
		clearInterval(this.clearTime)
		clearInterval(this.clearTime1)
	}

	handleMessageData (events, params, connection) {
		if (events === 'test') {
			console.log('00000000000')
			if (this.clearTime) clearInterval(this.clearTime)
			this.clearTime = setInterval(async () => {
				const res = await this.userModel.getUsers(params)
				return connection.sendUTF('test-' + JSON.stringify(res))
			}, 1000)
		}
		if (events === 'hello') {
			if (this.clearTime1) clearInterval(this.clearTime1)
			this.clearTime1 = setInterval(async () => {
				const res = await new ScreenModel().getUsers(params)
				return connection.sendUTF('hello-' + JSON.stringify(res))
			}, 1000)
		}
	}

}

export default MessageSocketServer

