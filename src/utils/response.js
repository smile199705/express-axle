// response.js

class Response {
	static success (res, data, status = 200) {
		res.status(status).json({
			code: status,
			message: 'success',
			data: data ?? {}
		})
	}

	static error (res, err) {
		console.error('this error: ', err)
		res.status(500).json({
			code: 500,
			message: err.toString() ?? 'error',
			data: {}
		})
	}

	static notFound (req, res, status = 404){
		res.status(status).json({
			code: status,
			message: 'Not Found:  ' + req.originalUrl,
			data: {}
		})
	}
}

export default Response
