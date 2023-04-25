// app.js
import express from 'express'
import createError from 'http-errors'
import nconf from 'nconf'
nconf.argv().env().file({ file: 'configMap.json' })
global.cc = nconf.get()
import bodyParser from 'express'
import morgan from 'morgan'
import Run from './src/utils/run.js'
import WebSocketServer from './src/websocket/WebSocketServer.js'
// import { Server } from 'socket.io'
import Controller from './src/controllers/Controller.js'
import { server as Server } from 'websocket'
import { dm_connection_fail, dm_log, start_printf } from './src/utils/start_printf.js'
import { db } from './src/utils/dmdb.js'

class App {
    constructor () {
        this.app = express()
        this.websocketServer = new WebSocketServer()
        this.PORT = nconf.get('port') ?? 8080
        this.ipAddress = Run.getIpAddress() ?? '127.0.0.1'
    }

    async start () {
        try {
            // await db.createPool();
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
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
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
        const server = this.app.listen(this.PORT)
        // const io = new Server(server, {
        //     cors: {
        //         origin: '*'
        //     }
        // })
        const io = new Server({ httpServer: server, autoAcceptConnections: false })
        this.websocketServer.start(io)
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
