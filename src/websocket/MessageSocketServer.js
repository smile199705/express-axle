import UserService from '../services/UserService.js'

class MessageSocketServer {

    constructor () {
        this.userServer = new UserService()
        this.clearTime = null
        this.clearTime1 = null
    }

    handleMessageData (events, params, connection) {
        if (events === 'test') {
            if (this.clearTime) clearInterval(this.clearTime)
            setInterval(async () => {
                const res = await this.userServer.getUsers(params)
                return connection.sendUTF('test-' + JSON.stringify(res))
            }, 1000)
        }
        if (events === 'hello') {
            if (this.clearTime1) clearInterval(this.clearTime1)
            setInterval(async () => {
                const res = await this.userServer.getUsers(params)
                return connection.sendUTF('hello-' + JSON.stringify(res))
            }, 1000)
        }
    }

}

export default MessageSocketServer

