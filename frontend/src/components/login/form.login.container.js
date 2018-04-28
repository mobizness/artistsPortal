import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginForm from "./form.login.component";
import { login } from "./login.actions";

const mapStateToProps = (state) => ({
  loginFetching: state.login.loginFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);