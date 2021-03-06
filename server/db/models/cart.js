const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  stars: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Cart