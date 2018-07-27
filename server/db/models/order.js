const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  stars: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  amount: {
    type: Sequelize.INTEGER
  },
  stripeId: {
    type: Sequelize.STRING
  }
})

module.exports = Order