const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test('environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('resolves of the hobbits in the table', async () => {
        const result = await Hobbit.getAll()
        expect(result).toHaveLength(4)
        expect(result[0]).toMatchObject({name: 'sam'})
        expect(result[1]).toMatchObject({name: 'frodo'})
        expect(result[2]).toMatchObject({name: 'pippin'})
        expect(result[3]).toMatchObject({name: 'merry'})
    })
})

describe('getById',  () => {
    test('resolves the hobbit by the given id', async () => {
        let result = await Hobbit.getById(1)
        expect(result).toMatchObject({name: 'sam'})
        result = await Hobbit.getById(2)
         expect(result).toMatchObject({name: 'frodo'})
        result = await Hobbit.getById(3)
         expect(result).toMatchObject({name: 'pippin'})
        result = await Hobbit.getById(4)
         expect(result).toMatchObject({name: 'merry'})
    })
})

describe('insert', () => {
    const bilbo = { name: 'bilbo'}
    test('resolves the newly created hobbit', async () => {
       await Hobbit.insert(bilbo)
       const record = await db('hobbits')
        expect(record).toHaveLength(5)
    })
    test('adds the hobbit to the hobbits table', async () => {
            await Hobbit.insert(bilbo)
       const record = await db('hobbits')
        expect(record[4]).toMatchObject(bilbo)
    })
})

describe('update', () => {
    const changes = { name: 'juan' }
    test('updates the database correctly', async () => {
        const id = await Hobbit.update(1, changes)
        const updated = await Hobbit.getById(id)
        const record = await db('hobbits')
        expect(record[0]).toMatchObject(updated)
    })
})

describe('remove', () => {
    test('removes a hobbit form the database', async () => {
        await Hobbit.remove(1)
        const record = await db('hobbits')
        expect(record).toHaveLength(3)
    })
})