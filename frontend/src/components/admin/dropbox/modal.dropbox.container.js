import {connect} from "react-redux";
import {toggleDropboxModal, uploadToDropbox} from "./admin.dropbox.actions";
import DropboxModal from "./modal.dropbox.component";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
  ...state.admin.dropbox,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggle: () => dispatch(toggleDropboxModal()),
  upload: file => dispatch(uploadToDropbox(ownProps.match.params.artistKey, file)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropboxModal));