import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/user'

function ProtectedRouteAdmin({ component: Component, children, ...rest }) {
  const currentUser = useSelector(getCurrentUser())
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser?.admin) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}
ProtectedRouteAdmin.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ProtectedRouteAdmin
