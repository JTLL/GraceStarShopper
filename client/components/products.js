import React from 'react'

const Products = props => {
  return (
    <div className="ui card">
      <div className="image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/290px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" />
      </div>
      <div className="content">
        <p className="header">Planet Name</p>
        <div className="description">Planet Size | Planet Cost</div>
        <div
          className="ui vertical animated button"
          tabindex="0"
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

export default Products
