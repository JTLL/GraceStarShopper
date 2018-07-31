import React from 'react'

const Landing = props => {
  return (
    <div className="ui fluid image">
      <img src="https://jorgeflores55.files.wordpress.com/2011/06/dibujo.jpg" />
      <a className="landing" href="/products">
        See all Stars
      </a>
      <div className="landingText">
        Everyone's a Star, but now you can own one!
        <br />
        <br />
        ...while quantities last
      </div>
    </div>
  )
}

export default Landing
