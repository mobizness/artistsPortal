import React from 'react';
import {Button, Container} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Dropbox from "../../dropbox/dropbox.container";
import DropboxUpload from "./modal.dropbox.container";
import {deleteFile, toggleDropboxModal} from "./admin.dropbox.actions";

class AdminDropbox extends React.Component {
  render() {
    const {toggleModal} = this.props;
    return (
      <Container>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px'}}>
          <Link to={'/'}><Button color={'link'}>Back</Button></Link>
          <Button color={'primary'} onClick={() => toggleModal()}>Upload file</Button>
        </div>
        <Dropbox deleteFn={deleteFile} artistKey={this.props.match.params.artistKey} showFull={true}/>
        <DropboxUpload/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal: toggleDropboxModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDropbox);