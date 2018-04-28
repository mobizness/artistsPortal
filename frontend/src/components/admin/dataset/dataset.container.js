import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import UploadDataset from "./dataset.component";
import {toggleModal, upload} from "./dataset.actions";

const mapStateToProps = state => ({
  ...state.admin.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle: toggleModal,
  upload,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadDataset);