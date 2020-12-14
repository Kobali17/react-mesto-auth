import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
        <Route>
            {
                () => (props.isLoggedIn ? <><Component {...props}/>{props.children}</> : <Redirect to="./sign-in"/>)
            }
        </Route>
  );
}

export default ProtectedRoute;
