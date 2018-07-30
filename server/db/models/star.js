const Sequelize = require('sequelize')
const db = require('../db')

const Star = db.define('stars', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  magnitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'true'
  },
  price: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  owned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Star