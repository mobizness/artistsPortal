import React, {Component} from 'react';
import LoginForm from "./login/login.component";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./header/header";
import Admin from "./admin/admin.component";
import ArtistDashboard from "./artist/dashboard.component";

class App extends Component {

  render() {
    const {token} = this.props;
    return (
      <div className="App">
        <Header/>
        <div className="body">
          <Switch>
            <Route path="/login">
              {token ?
                <Redirect to={"/"}/>
                :
                <LoginForm/>
              }
            </Route>
            <Route path="/">
              {token ?
                token.role === 'ADMIN' ?
                  <Admin/>
                  :
                  <ArtistDashboard/>
                :
                <Redirect to={"/login"}/>
              }
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps)(App));
