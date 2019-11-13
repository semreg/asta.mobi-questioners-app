import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import verifyScope from '../utils/verifyScope'

const PrivateRoute = ({ component: Component, path, requiredScope = [], history, ...rest }) => {
  const { isAuthenticated, loginWithRedirect, scope } = useAuth0()

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        })
      }
    }
    fn()
  }, [isAuthenticated, loginWithRedirect, path])

  if (!verifyScope(scope, requiredScope)) {
    return <Redirect to='/' />
  }

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
}

export default PrivateRoute
