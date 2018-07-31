const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Star = db.model('stars')
const User = db.model('user')

describe('Star routes', async () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  beforeEach(async () => {
    return await Star.create({
      name: 'TidianeStar',
      magnitude: +0.15,
      price: 5000
    })
  })
  beforeEach(async () => {
    return User.create({
      name: 'cody',
      email: 'codys@Email.com'
    })
  })
  it('GET /api/stars', async () => {
    const res = await request(app)
      .get('/api/stars')
      .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal('TidianeStar')
  });
  it('GET /api/stars/:id', async () => {
    const res = await request(app)
      .get('/api/stars/1')
      .expect(200)

    expect(res.body).to.be.an('object')
    expect(res.body.magnitude).to.be.equal(+0.15)
  })
  it('PUT /api/stars/:id for User', async () => {
    await request(app)
      .put('/api/stars/1')
      .send({ userId: 1, owned: true })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.userId).to.be.equal(1)
        expect(res.body.owned).to.be.equal(true)
      })
  });
  it('PUT /api/stars/:id for Guest', async () => {
    await request(app)
      .put('/api/stars/1')
      .send({ userId: undefined, owned: true })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.userId).to.be.equal(null)
        expect(res.body.owned).to.be.equal(true)
      })
  });
})