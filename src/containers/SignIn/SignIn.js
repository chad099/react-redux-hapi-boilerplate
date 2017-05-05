/* eslint-disable*/
import React, {Component, PropTypes} from 'react';
import { Button, Icon, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login } from '../../redux/modules/auth';

@connect((state) => ({
  user: state.auth.user,
  loggingIn: state.auth.loggingIn,
  loginError: state.auth.loginError,
}))

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {usrname: '', password: ''};
  }
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    loginError: PropTypes.string,
    loggingIn: PropTypes.bool,
  };


  doLogin = (e, { formData }) => new Promise((resolve, reject) => {
      const {dispatch} = this.props;
      e.preventDefault();
      dispatch(login({username: this.state.username, password: this.state.password}))
          .then(resolve)
          .catch(err => {
              reject(err);
          });
    });
    oninputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    render() {
      const { user, loginError, loggingIn } = this.props;
        return (
          <div>
            <div className="text-center">
              <h2>Welcome To react redux hapi boilerplate</h2>
              {!user && (
                <div>
                  <h3>Please Sign in</h3>
                  {
                    loginError && <div>
                      <div className="ui hidden divider" />
                      <Message negative>
                        <Message.Header>
                          Error
                        </Message.Header>
                        <p>{(loginError && loginError.message) || loginError}</p>
                      </Message>
                      <div className="ui hidden divider" />
                    </div>
                  }
                  <div className="ui hidden divider" />
                  <Form loading={loggingIn} onSubmit={this.doLogin}>
                    <Form.Group inline>
                      <Form.Input label="Enter Username" onChange={this.oninputChange} value={this.state.username} name="username" type="email" autoComplete="off" />
                    </Form.Group>
                    <Form.Group inline>
                      <Form.Input label="Enter Password" onChange={this.oninputChange} name="password" value={this.state.password} type="password" autoComplete="off" />
+                    </Form.Group>
                    <div className="ui hidden divider" />
                    <Form.Group inline>
                      <Button type="submit" primary disabled={loggingIn}>
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              )}

              {user && <div>
                <p>You are currently logged in as {user.email}.</p>
                <p>Please wait while we redirect you to your home page...</p>
                <p>or you may click <a href="/dashboard">here</a>&nbsp;instead.</p>
              </div>
              }
            </div>
          </div>
        );
    }
}

export default SignIn
