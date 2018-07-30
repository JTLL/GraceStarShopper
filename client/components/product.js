import React from 'react'

const Product = props => {
  const {product, handleSubmit, handleRemove, location, userId, cart} = props
  const cartReducer = (accumulator, currentValue) => {
    return currentValue.id === product.id || accumulator
  }
  return (
    <div className="ui card">
      <div className="image">
        <img src={product.image} />
      </div>
      <div className="content">
        <p className="header">{product.name}</p>
        <div className="description margin-bottom">
          Magnitude: {product.magnitude} | Prices: ${product.price}
        </div>
        {location.pathname === '/cart' ? (
          <button
            className="ui button"
            onClick={() => {
              handleRemove(product.id, userId)
            }}
          >
            Remove
          </button>
        ) : cart.reduce(cartReducer, false) ? (
          <button className="ui button">Added</button>
        ) : (
          <div
            className="ui vertical animated button"
            tabIndex="0"
            onClick={() => {
              userId
                ? handleSubmit(product.id, userId)
                : localStorage.setItem('starCart', [
                    localStorage.getItem('starCart'),
                    product.id
                  ])
            }}
          >
            <div className="hidden content">Add</div>
            <div className="visible content">
              <i className="shop icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product