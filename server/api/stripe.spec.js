// const { expect } = require('chai')
// const request = require('supertest')
// const app = require('../index')

// describe.only('POST /api/stripe/charge', () => {
//   it('processes stripe charge', async () => {
//     await request(app)
//       .post('/api/stripe/charge')
//       .send({ amount: 5000, cardType: 'mastercard' })
//       .expect(201)
//       .then(res => {
//         expect(res.amount).to.equal(5000)
//         expect(res.cardType).to.equal('mastercard')
//       })
//   })
// })