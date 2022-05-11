import { Route, PathRouteProps, Navigate } from 'react-router-dom';


import { useEffect, Component } from 'react';

export class ProtectedRoute extends Component<{isLoggedIn: Boolean, children: JSX.Element}> {

  constructor(props: {isLoggedIn: Boolean, children: JSX.Element}) {
    super(props);
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
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