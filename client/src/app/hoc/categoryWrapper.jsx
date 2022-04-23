import React from 'react'
import PropTypes from 'prop-types'

const CategoryWrapper = ({ children }) => {
  return <div className="wrapper__category">{children}</div>
}

CategoryWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  background: PropTypes.string
}

export default CategoryWrapper
