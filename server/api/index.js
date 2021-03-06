const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/stars', require('./stars'))
router.use('/stripe', require('./stripe'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
