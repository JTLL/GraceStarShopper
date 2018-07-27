const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/remove/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      }
    })
    console.log('cart', cart.stars)
    let cartArray = cart.stars.filter(star => star !== req.body.id)
    const newCart = await cart.update({stars: cartArray})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      }
    })
    let cartArray = [...cart.stars, req.body.id]
    const newCart = await cart.update({stars: cartArray})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
