import React from 'react'

const Product = props => {
  const {product} = props
  return (
    <div className="ui card">
      <div className="image">
        <img src={product.image} />
      </div>
      <div className="content">
        <p className="header">{product.name}</p>
        <div className="description">
          Magnitude: {product.magnitude} | Price {product.price}
        </div>
        <div
          className="ui vertical animated button"
          tabIndex="0"
          style={{marginTop: '10px'}}
        >
          <div className="hidden content">Add</div>
          <div className="visible content">
            <i className="shop icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
