import request from 'supertest'
import app from '@app/api/app'

describe('Missions API E2E', () => {
  describe('full mission flow', () => {
    it('loads items, starts mission, ends mission', async () => {
      const moverRes = await request(app)
        .post('/api/v1/movers')
        .send({ weightLimit: 100 })
        .expect(201)
      const moverId = moverRes.body.id

      const item1Res = await request(app)
        .post('/api/v1/items')
        .send({ name: 'Scroll', weight: 5 })
        .expect(201)
      const item2Res = await request(app)
        .post('/api/v1/items')
        .send({ name: 'Potion', weight: 3 })
        .expect(201)

      const loadRes = await request(app)
        .post('/api/v1/missions')
        .send({ moverId, itemIds: [item1Res.body.id, item2Res.body.id] })
        .expect(200)

      expect(loadRes.body.questState).toBe('loading')
      expect(loadRes.body.currentItemIds).toHaveLength(2)

      const startRes = await request(app)
        .patch(`/api/v1/missions/${moverId}/start`)
        .expect(200)
      expect(startRes.body.questState).toBe('on-mission')

      const endRes = await request(app)
        .patch(`/api/v1/missions/${moverId}/end`)
        .expect(200)
      expect(endRes.body.questState).toBe('resting')
      expect(endRes.body.currentItemIds).toHaveLength(0)
    })
  })
})
