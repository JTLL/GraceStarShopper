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

router.get('/:id', async (req, res, next) => {
  try {
    const singleStar = await Star.findById(req.params.id)
    res.json(singleStar)
  } catch (error) {
    next(error)
  }
})