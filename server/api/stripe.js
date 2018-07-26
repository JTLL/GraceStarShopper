const router = require('express').Router()
const stripe = require('stripe')(process.env.stripeKey)

router.get('/', async (req, res, next) => {
  const response = await stripe.balance.retrieve()
  res.send(response)
})

module.exports = router
