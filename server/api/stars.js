const router = require('express').Router()
const { Star } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allStars = await Star.findAll({
      where: {
        owned: false
      }
    })
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

router.put('/:id', async (req, res, next) => {
  try {
    const star = await Star.findById(req.params.id)
    const ownedStar = await star.update(req.body)
    res.json(ownedStar)
  } catch (error) {
    next(error)
  }
})