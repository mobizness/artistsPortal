import React from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label} from "reactstrap";

class ArtistForm extends React.PureComponent {

  constructor(props) {
    super(props);

    const {active, artistKey, name, email} = this.props;

    this.state = {
      active: {
        value: !!active,
      },
      artistKey: {
        value: artistKey || '',
        error: '',
      },
      name: {
        value: name || '',
        error: '',
      },
      email: {
        value: email || '',
        error: '',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
    const {
      active,
      artistKey,
      name,
      email,
    } = this.state;
    const validated = {};
    let hasError = false;
    if (artistKey.value.length === 0) {
      hasError = true;
      validated.artistKey = {
        value: artistKey.value,
        error: "Artist Key is required"
      }
    }
    if (name.value.length === 0) {
      hasError = true;
      validated.name = {
        value: name.value,
        error: "Name is required"
      }
    }
    if (email.value.length === 0) {
      hasError = true;
      validated.email = {
        value: email.value,
        error: "Email is required"
      }
    }
    if (!hasError && typeof(this.props.onSubmit) === 'function') {
      this.props.onSubmit({
        active: active.value,
        artistKey: artistKey.value,
        name: name.value,
        email: email.value,
      })
        .catch(reason => {
          if (reason.type === 'validation') {
            this.setState(reason.message);
          }
        });
    }
    else {
      this.setState(validated);
    }
  };


  render() {
    const {
      active,
      artistKey,
      name,
      email,
    } = this.state;
    return (
      <Form>
        <Card>
          <CardBody>
            <FormGroup row>
              <Label sm={3}>Active</Label>
              <Col xs={9}>
                <input type="checkbox" name="active" checked={active.value}
                       onChange={this.handleInputChange}
                       style={{marginTop: '11.5px'}}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="artist" sm={3}>Artist Key</Label>
              <Col sm={9}>
                <Input type="text" name="artistKey" id="artist"
                       value={artistKey.value}
                       onKeyPress={this.handleEnter}
                       onChange={this.handleInputChange}
                />
                <Label for="artist" hidden={!artistKey.error.length} className="text-danger">{artistKey.error}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={3}>Name</Label>
              <Col sm={9}>
                <Input type="text" name="name" id="name"
                       value={name.value}
                       onKeyPress={this.handleEnter}
                       onChange={this.handleInputChange}
                />
                <Label for="name" hidden={!name.error.length} className="text-danger">{name.error}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={3}>Email</Label>
              <Col sm={9}>
                <Input type="email" name="email" id="email"
                       value={email.value}
                       onKeyPress={this.handleEnter}
                       onChange={this.handleInputChange}
                />
                <Label for="email" hidden={!email.error.length} className="text-danger">{email.error}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs={{size: 9, offset: 3}}>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                  <Button color="primary" onClick={this.submit}>Save</Button>
                </div>
              </Col>
            </FormGroup>
          </CardBody>
        </Card>
      </Form>
    );
  }
}

export default ArtistForm;