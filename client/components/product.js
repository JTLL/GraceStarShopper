import React from 'react'

const Product = props => {
  const {product, handleSubmit, handleRemove, location, userId} = props
  return (
    <div className="ui card">
    {console.log("location", location)}
      <div className="image">
        <img src={product.image} />
      </div>
      <div className="content">
        <p className="header">{product.name}</p>
        <div className="description">
          Magnitude: {product.magnitude} | Prices: ${product.price}
        </div>
        {location.pathname === '/cart' ? (
          <button className="ui button" onClick={() => handleRemove(product.id)}>Remove</button>
        ) : (
          <div
            className="ui vertical animated button"
            tabIndex="0"
            style={{marginTop: '10px'}}
            onClick={() => handleSubmit(product.id, userId)}
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
