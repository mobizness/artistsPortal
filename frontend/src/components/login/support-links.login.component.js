import React from "react";
import { Link } from "react-router-dom";

export default class SupportLinks extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Link to="/login/resetPassword">Password Forgotten?</Link>
        <a href="mailto:IT@pacegallery.com">Support</a>
      </div>
    );
  }
}