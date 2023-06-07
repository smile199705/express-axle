import UserModel from '../models/UserModel.js'

class MessageSocketServer {

	constructor () {
		this.userModel = new UserModel()
		this.clearTime = null
		this.clearTime1 = null
	}

	handleMessageData (events, params, connection) {
		if (events === 'test') {
			if (this.clearTime) clearInterval(this.clearTime)
			setInterval(async () => {
				const res = await this.userModel.getUsers(params)
				// console.log(JSON.stringify(res))
				return connection.sendUTF('test-' + JSON.stringify(res))
			}, 1000)
		}
		if (events === 'hello') {
			if (this.clearTime1) clearInterval(this.clearTime1)
			setInterval(async () => {
				const res = await new UserModel().getUsers(params)
				return connection.sendUTF('hello-' + JSON.stringify(res))
			}, 1000)
		}
	}

}

export default MessageSocketServer

