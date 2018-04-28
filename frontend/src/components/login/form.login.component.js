import React, { Fragment } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import SpinnerLoader from '../shared/loader/spinner.loader.component';

export default class LoginForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      rememberMe: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submit();
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: {
        value,
        error: ''
      }
    });
  }

  submit = () => {
    const { login } = this.props;
    const { email, password, rememberMe } = this.state;
    const validated = {};
    let hasError = false;
    if (email.value.length === 0) {
      hasError = true;
      validated.email = {
        value: email.value,
        error: "Email is required"
      }
    }
    if (password.value.length === 0) {
      hasError = true;
      validated.password = {
        value: password.value,
        error: "Password is required"
      }
    }
    if (!hasError) {
      login(email.value, password.value, rememberMe)
      .catch((reason) => {
        if (reason.type === 'login') {
          this.setState({
            password: {
              ...this.state.password,
              error: reason.message
            }
          });
        }
      });
    }
    else {
      this.setState(validated);
    }
  };

  render() {
    const { loginFetching } = this.props;
    const {
      email,
      password,
      rememberMe,
    } = this.state;

    return (
      <Fragment>
        <Row className={'login-header'}>
          <Col cx={'auto'}>
            <h1 className={'text-left'}>PACE Artist Portal</h1>
          </Col>
        </Row>
        <Form style={{ paddingBottom: '20px' }}>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Label for="email" hidden={!email.error.length} className="text-danger">{email.error}</Label>
            <Input type="email" name="email" id="email" placeholder="Email"
                   value={email.value}
                   invalid={!!email.error.length}
                   onKeyPress={this.handleEnter}
                   onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password*</Label>
            <Label for="password" hidden={!password.error.length} className="text-danger">{password.error}</Label>
            <Input type="password" name="password" id="password" placeholder="Password"
                   value={password.value}
                   invalid={!!password.error.length}
                   onKeyPress={this.handleEnter}
                   onChange={this.handleInputChange}
            />
          </FormGroup>
          {loginFetching ?
              <SpinnerLoader width={'37px'} height={'37px'}/>
            :
            <Fragment>
              <FormGroup inline check>
                <Button color={'primary'} className={'button-primary'} onClick={this.submit}
                        disabled={loginFetching}>Sign In</Button>

              </FormGroup>
              <FormGroup inline check>
                <Label check>
                  <Input type="checkbox" name="rememberMe" checked={rememberMe}
                         onChange={this.handleInputChange}
                  /> Remember me
                </Label>
              </FormGroup>
            </Fragment>
          }
        </Form>
      </Fragment>
    );
  }
}