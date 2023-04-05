import Model from './Model.js'

class UserModel extends Model {
    constructor () {
        super()
    }

    async getList (params) {
        return {
            id: 1,
            test: params
        }
    }

}

export default UserModel
