import express from 'express'
import * as http from 'http'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from 'debug'
import dotenv from 'dotenv'
import helmet from 'helmet'

import { CommonRoutesConfig } from './common/common.routes.config'
import { UsersRoutes } from './users/users.routes.config'
import { AuthRoutes } from './auth/auth.routes.config'

const dotenvResult = dotenv.config()
if (dotenvResult.error) throw dotenvResult.error

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3000

const routes: Array<CommonRoutesConfig> = []

const debugLog: debug.IDebugger = debug('app')

app.use(express.json()) // parse all incoming requests as JSON 
app.use(cors())

// will automatically log all HTTP requests
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
}

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // log requests as one-liners
    if (typeof global.it === 'function') {
        loggerOptions.level = 'http' // silence
    }
}

app.use(expressWinston.logger(loggerOptions))

app.use(helmet())

// routes added to our app
routes.push(new AuthRoutes(app))
routes.push(new UsersRoutes(app))

// canary
const runningMessage = `Server running at http://localhost:${port}`
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
})

export default server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
    console.log(runningMessage)
});