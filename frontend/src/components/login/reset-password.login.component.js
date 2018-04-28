import React, { Fragment } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";

class ResetPassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      resetted: false,
    };

    this.reset = this.reset.bind(this);
  }

  reset(e) {
    e.preventDefault();

    this.setState({
      resetted: true,
    });
  }

  render() {
    const { resetted } = this.state;
    return (
      <Fragment>
        <div style={{ paddingBottom: '20px' }}>
          To reset your password, enter the email, and we will send you the one-time link to reset your password.
        </div>
        {resetted ?
          <div className="text-success" style={{ paddingBottom: '20px' }}>
            We have sent you a link to reset your password!
          </div>
          :
          <Form>
            <FormGroup>
              <Input type="email" placeholder="email"/>
            </FormGroup>

            <FormGroup>
              <Button color="primary" onClick={this.reset}>Reset password</Button>
              <Link to={"/login"} style={{padding: '0 12px'}}>
                Back to login
              </Link>
            </FormGroup>
          </Form>
        }
      </Fragment>
    );
  }
}

export default ResetPassword;