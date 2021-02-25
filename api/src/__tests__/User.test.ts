import request from 'supertest'
import app from '../app'
import createConnection from '../database'

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it('Should be able to create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ email: 'user@example.com', name: 'User Example' })

        expect(res.status).toBe(201)
    })

    it("Shouldn't be able to create an user with exists email", async () => {
        const res = await request(app)
            .post('/users')
            .send({ email: 'user@example.com', name: 'User Example' })

        expect(res.status).toBe(400)
    })
})