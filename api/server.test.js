const db  = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('[GET] /hobbits', () => {
    test('responds with 200 Ok', async () => {
        const res = await request(server).get('/hobbits')
        expect(res.status).toBe(200)
    })
    test('responds with all the hobbits ', async () => {
        const res = await request(server).get('/hobbits')
        expect(res.body).toHaveLength(4)
    })
})

describe('[POST] /hobbits', () => {
    const bilbo = { name: 'bilbo' }
    test('adds a hobbit to the database', async () => {
         await request(server).post('/hobbits').send(bilbo)
        expect(await db('hobbits')).toHaveLength(5)
    })
    test('responds with the hobbit ', async () => {
        const res = await request(server).post('/hobbits').send(bilbo)
         expect(res.body).toMatchObject(bilbo)
    })
})

describe('[GET] /hobbits/:id', () => {
    test('reponds with the hobbit by the given id', async () => {
        const res = await request(server).get('/hobbits/1')
        expect(res.body).toMatchObject({ name: 'sam' })
    })
})

describe('[DELETE] /hobbits/:id',  () => {
    test('deletes a record from the hobbits table', async() => {
        const res = await request(server).delete('/hobbits/1')
        expect(res.body).toHaveLength(3)
    })
})

describe('[PUT] /hobbits', () => {
    const changes = { name: 'juan' }
    test('updates and responds with the updated record', async() => {
        const res = await request(server).put('/hobbits/1').send(changes)
        expect(res.body).toMatchObject(changes)
    })
} )