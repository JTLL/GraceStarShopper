const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/remove', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    const newCart = await cart.update({stars: []})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/removeOne', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    let cartArray = cart.stars.filter(star => star !== req.body.id)
    const newCart = await cart.update({stars: cartArray})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/update', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    let cartArray = [...cart.stars, req.body.id]
    const newCart = await cart.update({stars: cartArray})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
