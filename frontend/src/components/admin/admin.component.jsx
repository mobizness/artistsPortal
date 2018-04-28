import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import AdminDashboard from './dashboard';
import AdminDropbox from "./dropbox/admin.dropbox.component";

class Admin extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={"/dropbox/:artistKey"} component={AdminDropbox}/>
        <Route path={'/'} component={AdminDashboard}/>
      </Switch>
    );
  }
}

export default withRouter(Admin);