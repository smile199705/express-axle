import Router from '../routers/Router.js'
import ScreenController from './ScreenController.js'

/**
 * 实例化控制器并获取路由
 * 每新增一个controller在构造函数里new一个
 */
class Controller extends Router {
	constructor () {
		super()
	}

	static getAllRouter () {
		return [
			new ScreenController().getRouter()
		]
	}
}

export default Controller
