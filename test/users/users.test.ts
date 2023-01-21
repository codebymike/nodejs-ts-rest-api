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

    it('should allow a POST to /users', async function () {
        const res = await request.post('/users').send(firstUserBody)

        expect(res.status).to.equal(201)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.a('string')
        firstUserIdTest = res.body.id
    })

    it('should allow a POST to /auth', async function () {
        const res = await request.post('/auth').send(firstUserBody)
        expect(res.status).to.equal(201)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object')
        expect(res.body.accessToken).to.be.a('string')
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
    })

    it('should allow a GET from /users/:userId with an access token', async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.be.a('string');
        expect(res.body._id).to.equal(firstUserIdTest);
        expect(res.body.email).to.equal(firstUserBody.email);
    })
})
