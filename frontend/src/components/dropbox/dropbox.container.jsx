import React from 'react';
import {connect} from "react-redux";
import SpinnerLoader from "../shared/loader/spinner.loader.component";
import Dropbox from "./dropbox.component";
import {deleteFile, fetchDropbox} from "./dropbox.actions";

class DropboxContainer extends React.Component {
  componentDidMount() {
    this.props.fetchDropbox();
  }

  render() {
    const {deleteFile, files, showFull, status} = this.props;
    switch (status) {
      case 'fetching':
        return (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <SpinnerLoader height={'37px'} width={'37px'}/>
          </div>
        );
      case 'fetched':
        return <Dropbox deleteFile={deleteFile} files={files} showFull={showFull}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  files: state.dropbox.items,
  status: state.dropbox.status,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchDropbox: () => dispatch(fetchDropbox(ownProps.artistKey)),
  deleteFile: key => dispatch(deleteFile(ownProps.artistKey, key, ownProps.deleteFn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropboxContainer);