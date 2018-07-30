const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/user', async (req, res, next) => {
  try {
    const ordersById = await Order.findAll({
      where: {
        userId: req.user.id
      },
      order: [['id', 'DESC']]
    })
    res.json(ordersById)
  } catch (error) {
    next(error)
  }
})
