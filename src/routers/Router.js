import express from 'express'

class Router {
	constructor () {
		this.router = express.Router()
	}

	addRouteHandler (method, path, handler) {
		switch (method) {
		case 'GET':
			this.router.get(path, handler)
			break
		case 'POST':
			this.router.post(path, handler)
			break
		case 'PUT':
			this.router.put(path, handler)
			break
		case 'DELETE':
			this.router.delete(path, handler)
			break
		default:
			throw new Error(`Invalid method: ${method}`)
		}
	}

	addMiddleware (middleware) {
		this.router.use(middleware)
	}

	getRouter () {
		return this.router
	}
}

export default Router
