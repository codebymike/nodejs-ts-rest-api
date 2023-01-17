import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { Jwt } from '../../common/types/jwt'
import usersService from '../../users/services/users.service'


// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET


class JwtMiddleware {

    verifyRefreshBodyField(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.refreshToken) {
            return next()
        } else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] })
        }
    }
}

export default new JwtMiddleware()