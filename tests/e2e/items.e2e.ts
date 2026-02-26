import request from 'supertest'
import app from '@app/api/app'

describe('Items API E2E', () => {
  describe('POST /api/v1/items', () => {
    it('creates an item with valid payload', async () => {
      const res = await request(app)
        .post('/api/v1/items')
        .send({ name: 'Magic Sword', weight: 10 })
        .expect(201)

      expect(res.body).toMatchObject({
        name: 'Magic Sword',
        weight: 10,
      })
      expect(res.body).toHaveProperty('id')
      expect(typeof res.body.id).toBe('string')
    })

    it('returns 422 for invalid payload', async () => {
      await request(app)
        .post('/api/v1/items')
        .send({ name: '', weight: 5 })
        .expect(422)
    })

    it('returns 422 for negative weight', async () => {
      await request(app)
        .post('/api/v1/items')
        .send({ name: 'Item', weight: -1 })
        .expect(422)
    })
  })
})
