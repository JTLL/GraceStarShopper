'use strict'

const db = require('../server/db')

const {User, Star, Cart, Order} = require('../server/db/models')


const stars = [
  {
    name: 'Sun',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/290px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    magnitude: -26.74,
    price: 5000
  },
  {
    name: 'Sirius',
    image:
      'http://en.es-static.us/upl/2017/02/sirius-2-19-2018-Jim-Livingston-Custer-SD-lg-e1519156718851.jpg',
    magnitude: -1.46,
    price: 3000
  },
  {
    name: 'Canopus',
    image:
      'https://freestarcharts.com/images/Articles/Stars/Canopus/Canopus_Espenak.jpg',
    magnitude: -0.74,
    price: 300
  },
  {
    name: 'Alpha Centauri',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/The_bright_star_Alpha_Centauri_and_its_surroundings.jpg/170px-The_bright_star_Alpha_Centauri_and_its_surroundings.jpg',
    magnitude: +0.01,
    price: 400
  },
  {
    name: 'Arcturus',
    image:
      'https://freestarcharts.com/images/Articles/Stars/Arcturus/Arcturus_Espenak.jpg',
    magnitude: -0.05,
    price: 4000,
    userId: 1,
    owned: true
  },
  {
    name: 'Vega',
    image:
      'https://freestarcharts.com/images/Articles/Stars/Vega/Vega_Espenak.jpg',
    magnitude: +0.026,
    price: 400000
  },
  {
    name: 'Capella',
    image:
      'https://freestarcharts.com/images/Articles/Stars/Capella/Capella_Espenak.jpg',
    magnitude: +0.08,
    price: 6000
  },
  {
    name: 'Rigel',
    image: 'https://www.solarsystemquick.com/universe/rigel-star.jpg',
    magnitude: +0.13,
    price: 45000
  }
]

const user = [
  {
    name: 'Cody',
    email: 'cody@email.com',
    password: '123',
    salt: 'sithlord',
    admin: true
  },
  {
    name: 'Murphy',
    email: 'murphy@email.com',
    password: '123',
    salt: 'jedi'
  }
]

const carts = [
  {
    userId: 1
  },
  {
    userId: 2
  }
]

const orders = [
  {
    stars: [1],
    amount: 5000,
    stripeID: '123',
    userId: 1
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all(user.map(user => User.create(user)))
  const star = await Promise.all(stars.map(star => Star.create(star)))
  await Promise.all(carts.map(cart => Cart.create(cart)))
  await Promise.all(orders.map(order => Order.create(order)))
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${star.length} star`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
