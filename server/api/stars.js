const router = require('express').Router()
const {Star} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allStars = await Star.findAll({})
    res.json(allStars)
  } catch (err) {
    next(err)
  }
})
