// response.js

class Response {
	static success (res, data, status = 200) {
		res.status(status).json({
			code: status,
			message: 'success',
			data: data ?? {}
		})
	}

	static error (res, message, status = 500) {
		res.status(status).json({
			code: status,
			message: message ?? 'error',
			data: res ?? {}
		})
	}
}

export default Response
