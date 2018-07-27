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

router.put('/:id', async (req, res, next) => {
  console.log('cart from put')
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      }
    })
    let cartArray = [...cart.stars, req.body.id]
    const newCart = await cart.update({stars: cartArray})
    // console.log("body",req.body)
    console.log('cart:', cartArray)
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
