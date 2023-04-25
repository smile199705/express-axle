// user-service.js

// import UserModel from './user-model'

// import UserModel from '../models/UserModel.js'
import BaseService from './BaseService.js'
import MenuModel from '../models/MenuModel.js'
// import MenuModel from '../models/MenuModel.js'
// import MenuModel from '../models/MenuModel.js'

class MenuService extends BaseService {
    constructor () {
        super()
        this.menuModel = new MenuModel()
        console.log(this.menuModel, 'menuModel.......')
    }

    /**
     * 测试
     * @returns {Promise<{}>}
     */
    async getMenu (params) {
        // console.log(this.menuModel, 'WWWWWWWWWWWWWWWWWW')
        const res = await this.menuModel.getMenu(params)
        return res
    }

    async getUserById (id) {
        // const user = await this.model.query(id)
        // if (!user) throw new Error('User not found')
        const user = { 'name': '张三', age: 26, id }
        return user
    }
}

export default MenuService
