import { initializeMongoDB, disconnectMongoDB } from '@app/database/init'

beforeAll(async () => {
  await initializeMongoDB()
})

afterAll(async () => {
  await disconnectMongoDB()
})
