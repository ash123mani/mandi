import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const PrivateRoute = ({ children, ...rest }) => {
  const { userId } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
      userId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
