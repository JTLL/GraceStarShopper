const router = require('express').Router()
const stripe = require('stripe')(process.env.stripeKey)

const tokenTable = {
  visa: 'tok_visa',
  visaDebit: 'tok_visa_debit',
  masterCard: 'tok_mastercard',
  mastercardDebit: 'tok_mastercard_debit',
  mastercardPrepaid: 'tok_mastercard_prepaid',
  amex: 'tok_amex',
  discover: 'tok_discover',
  diners: 'tok_diners',
  jcb: 'tok_jcb',
  unionpay: 'tok_unionpay'
}

router.post('/charge', async (req, res, next) => {
  try {
    const token = tokenTable[req.body.cardType]
    const amount = req.body.amount

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
    res.send(charge)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
