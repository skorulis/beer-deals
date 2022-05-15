import { Route, PathRouteProps, Navigate, Outlet } from 'react-router-dom';


import { useEffect, Component } from 'react';

export class ProtectedRoute extends Component<{isLoggedIn: Boolean}> {

  constructor(props: {isLoggedIn: Boolean}) {
    super(props);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Outlet />
    } else {
      return <Navigate to="/" replace />
    } 
  }
}

export function PrivateRoute(props: PathRouteProps) {

    useEffect(() => {
        // Your code here
      }, []);

    return <Route path={props.path} element={props.element} />

    
}