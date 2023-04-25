import Model from './Model.js'

class UserModel extends Model {
    constructor () {
        super()
    }

    async getUsers (params) {
        return {
            id: 5678,
            name: params
        }
    }
}

export default UserModel
