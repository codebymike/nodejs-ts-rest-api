import express from 'express'
import debug from 'debug'

import userService from '../services/users.service'

const log: debug.IDebugger = debug('app:users-controller')

class UsersMiddleware {
    
}

export default new UsersMiddleware()