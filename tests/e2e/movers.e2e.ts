import request from 'supertest'
import app from '@app/api/app'

describe('Movers API E2E', () => {
  describe('POST /api/v1/movers', () => {
    it('creates a mover with valid payload', async () => {
      const res = await request(app)
        .post('/api/v1/movers')
        .send({ weightLimit: 100 })
        .expect(201)

      expect(res.body).toMatchObject({
        weightLimit: 100,
        questState: 'resting',
        currentItemIds: [],
      })
      expect(res.body).toHaveProperty('id')
      expect(typeof res.body.id).toBe('string')
    })

    it('creates a mover with optional questState', async () => {
      const res = await request(app)
        .post('/api/v1/movers')
        .send({ weightLimit: 50, questState: 'loading' })
        .expect(201)

      expect(res.body).toMatchObject({
        weightLimit: 50,
        questState: 'loading',
      })
    })

    it('returns 422 for invalid payload', async () => {
      const res = await request(app)
        .post('/api/v1/movers')
        .send({ weightLimit: -1 })
        .expect(422)

      expect(res.body).toHaveProperty('errors')
    })

    it('returns 422 for missing weightLimit', async () => {
      await request(app).post('/api/v1/movers').send({}).expect(422)
    })
  })

  describe('GET /api/v1/movers/leaderboard', () => {
    it('returns leaderboard with movers that completed missions', async () => {
      const m1 = await request(app).post('/api/v1/movers').send({ weightLimit: 100 })
      const m2 = await request(app).post('/api/v1/movers').send({ weightLimit: 200 })
      const item1 = await request(app).post('/api/v1/items').send({ name: 'Item1', weight: 5 })
      const item2 = await request(app).post('/api/v1/items').send({ name: 'Item2', weight: 3 })

      await request(app)
        .post('/api/v1/missions')
        .send({ moverId: m1.body.id, itemIds: [item1.body.id] })
      await request(app).patch(`/api/v1/missions/${m1.body.id}/start`)
      await request(app).patch(`/api/v1/missions/${m1.body.id}/end`)

      await request(app)
        .post('/api/v1/missions')
        .send({ moverId: m2.body.id, itemIds: [item2.body.id] })
      await request(app).patch(`/api/v1/missions/${m2.body.id}/start`)
      await request(app).patch(`/api/v1/missions/${m2.body.id}/end`)

      const res = await request(app)
        .get('/api/v1/movers/leaderboard')
        .expect(200)

      expect(res.body).toHaveProperty('items')
      expect(Array.isArray(res.body.items)).toBe(true)
      expect(res.body.items.length).toBeGreaterThanOrEqual(2)
    })
  })
})
