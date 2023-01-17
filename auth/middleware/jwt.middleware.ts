import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { Jwt } from '../../common/types/jwt'
import usersService from '../../users/services/users.service'


// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET


class JwtMiddleware {
}

export default new JwtMiddleware()