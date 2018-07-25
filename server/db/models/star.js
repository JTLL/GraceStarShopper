const Sequelize = require('sequelize')
const db = require('../db')

const Star = db.define('stars', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  magnitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'true'
  },
  price: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
})

module.exports = Star