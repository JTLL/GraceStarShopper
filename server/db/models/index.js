const User = require('./user')
const Star = require('./star')
const Cart = require('./cart')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Star.belongsTo(User)
User.hasMany(Star)

Cart.belongsTo(User)
User.hasOne(Cart)

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Star,
  Cart,
  Order
}
