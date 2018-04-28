import React, {Fragment, PureComponent} from 'react';
import {Alert, Button, Form, FormGroup, FormText, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import SpinnerLoader from "../../shared/loader/spinner.loader.component";

class DropboxModal extends PureComponent {

  setRef = ref => this.inputRef = ref;
  handleUpload = () => {
    if (this.inputRef && this.inputRef.files && this.inputRef.files.length > 0) {
      const file = this.inputRef.files[0];
      if (this.props.upload) {
        this.props.upload(file);
      }
    }
  };

  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  render() {
    const {opened, toggle, status, error} = this.props;
    return (
      <Modal isOpen={opened} toggle={toggle} backdrop={true}>
        <ModalHeader toggle={toggle}>Upload File</ModalHeader>
        {
          status !== 'fetching' ?
            <Fragment>
              <ModalBody>
                <Form>
                  <FormGroup>
                    {
                      status === 'completed' &&
                      <Alert color='success'>New file uploaded successfully</Alert>
                    }
                    {
                      status === 'failed' &&
                      <Alert color='danger'>{error}</Alert>
                    }
                  </FormGroup>
                  <FormGroup>
                    <Input innerRef={this.setRef} type={"file"} name="file" id="file" required/>
                    <FormText color="muted">Choose file to upload</FormText>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.handleUpload()}>Submit</Button>{' '}
                <Button color="link" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Fragment>
            :
            <ModalBody>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <SpinnerLoader height={'37px'} width={'37px'}/>
              </div>
            </ModalBody>
        }
      </Modal>
    );
  }
}

export default DropboxModal;