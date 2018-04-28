import React from 'react';
import {Button, Col, FormGroup, Input, Label} from "reactstrap";
import moment from "moment";

const ResetPassword = ({lastLogin}) => (
  lastLogin ?
    <div style={{padding: '1.25rem'}}>
      <FormGroup row>
        <Label for="login" sm={3}>Last login</Label>
        <Col sm={9}>
          <Input type="text" name="login" id="login" value={moment(lastLogin.timestamp).format("M/D/YYYY hh:mm")} disabled/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="ip" sm={3}>IP address</Label>
        <Col sm={9}>
          <Input type="text" name="ip" id="ip" value={lastLogin.ipAddress} disabled/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="userAgent" sm={3}>UserAgent</Label>
        <Col sm={9}>
          <Input type="text" name="userAgent" id="userAgent" value={lastLogin.userAgent} disabled/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={{size: 9, offset: 3}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button color="primary">Reset Password</Button>
          <Button color="danger">Delete</Button>
        </Col>
      </FormGroup>
    </div>
    :
    <div style={{padding: '1.25rem'}}>
      Artist has never logged in
    </div>
);

export default ResetPassword;