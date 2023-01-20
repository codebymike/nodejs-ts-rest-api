import app from '../../app'
import supertest from 'supertest'
import { expect } from 'chai'
import shortid from 'shortid'
import mongoose from 'mongoose'

let firstUserIdTest = ''; 
const firstUserBody = {
    email: `johnsmith+${shortid.generate()}@testing.com`,
    password: 'P@55w0rD189',
}

let accessToken = ''
let refreshToken = ''
const newFirstName = 'Mike'
const newFirstName2 = 'John'
const newLastName2 = 'Simon'

describe('users and auth endpoints', function () {
    let request: supertest.SuperAgentTest
    before(function () {
        request = supertest.agent(app)
    })
    after(function (done) {
        app.close(() => {
            mongoose.connection.close(done)
        })
    })
})
