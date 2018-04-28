import React, {Fragment} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import Logo from './pace_header.svg';
import './header.css';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <header>
        <Container>
          <Row>
            <Col xs={12}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Link to="/">
                    <img className={'logo'} src={Logo}/>
                  </Link>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                  {
                    this.props.token && this.props.token !== '' ?
                      <Fragment>
                        <Button color="primary" onClick={this.props.logout}>Sign out</Button>
                      </Fragment>
                      :
                      <Link to="/login"><Button color="primary">Sign in</Button></Link>
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({type: 'LOGOUT'}),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));