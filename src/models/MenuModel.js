import Model from './Model.js'

class MenuModel extends Model {
    constructor () {
        super()
    }

    async getMenu (params) {
        return {
            id: 1223,
            type: params
        }
    }
}

export default MenuModel
