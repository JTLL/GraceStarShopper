/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Landing} from './landing'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Products} from './productList'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as OrderConfirmation} from './orderConfirmation'
export {default as Orders} from './orders'
export {default as Admin} from './admin'
export {default as MarioParty} from './marioParty'
