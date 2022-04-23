import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = ({ children, background }) => {
  return (
    <div className="container">
      <div className="wrapper" style={{ background: `${background}` }}>
        {children}
      </div>
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  background: PropTypes.string
}

export default Wrapper
