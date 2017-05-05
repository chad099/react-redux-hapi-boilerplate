import React, { Component } from 'react';
import SigIn from '../containers/SignIn';
import Dashboard from '../containers/Dashboard';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom';

@connect((state) => ({
  user: state.auth.user
}))

export default class MainRoute extends Component {

  render() {
    const checkAuth = {
      isAuthenticated: (this.props.user)? true : false
    }
    console.log('user', this.props);
    return (
      <ConnectedRouter history={this.props.history}>
        <div style={{height:"100%"}}>
          <Route exact path="/" component={SigIn}/>
          <AuthRoute path="/dashboard" component={Dashboard} checkAuth={checkAuth} />
        </div>
      </ConnectedRouter>
    );
  }
}

const AuthRoute = ({ component: Component, checkAuth: checkAuth, ...rest }) => (
  <Route {...rest} checkAuth={checkAuth} render={props => (
      checkAuth.isAuthenticated ? (
        <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
