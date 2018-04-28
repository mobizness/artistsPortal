import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import './login.component.css';
import SupportLinks from "./support-links.login.component";
import LoginForm from "./form.login.container";
import ResetPassword from "./reset-password.login.component";

class LoginPage extends React.Component {

  render() {
    const { url } = this.props.match;

    return (
      <Container>
        <Row className={'login-form'}>
          <Switch>
            <Route exact path={url + '/resetPassword'}>
              <Col xs={{ size: 6, offset: 3 }}>
                <ResetPassword/>
              </Col>
            </Route>
            <Route path={url}>
              <Col xs={{ size: 6, offset: 3 }}>
                <LoginForm/>
                <SupportLinks/>
              </Col>
            </Route>
          </Switch>
        </Row>
      </Container>
    );
  }
}

export default withRouter(LoginPage);