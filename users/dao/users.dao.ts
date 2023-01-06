import { CreateUserDto } from '../dto/create.user.dto'
import { PatchUserDto } from '../dto/patch.user.dto'
import { PutUserDto } from '../dto/put.user.dto'

import shortid from 'shortid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class UsersDao {
    users: Array<CreateUserDto> = []

    constructor() {
        log('Created new instance of UsersDao')
    }

    async addUser(user: CreateUserDto) {
        user.id = shortid.generate()
        this.users.push(user)
        return user.id
    }

    async getUsers() {
        return this.users
    }
    
    async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId)
    }
}

export default new UsersDao()