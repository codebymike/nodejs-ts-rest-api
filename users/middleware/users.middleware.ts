import express from 'express'
import debug from 'debug'

import userService from '../services/users.service'

const log: debug.IDebugger = debug('app:users-controller')

class UsersMiddleware {

    // helper to add id to each req body
    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }
    
    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.getUserByEmail(req.body.email)
        if (user) {
            res.status(400).send({ error: `User email already exists` })
        } else {
            next()
        }
    }
    
    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.getUserByEmail(req.body.email)
        if (user && user._id === req.params.userId) {
            next()
        } else {
            res.status(400).send({ error: `Invalid email` })
        }
    }
    
    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating email', req.body.email)
            // need arrow function for this. to have correct reference
            this.validateSameEmailBelongToSameUser(req, res, next)
        } else {
            next()
        }
    }
    
    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.readById(req.params.userId)
        if (user) {
            next()
        } else {
            res.status(404).send({
                error: `User ${req.params.userId} not found`,
            })
        }
    }
}

export default new UsersMiddleware()