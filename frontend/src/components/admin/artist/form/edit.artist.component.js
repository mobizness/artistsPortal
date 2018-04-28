import React from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Col, Container, Row} from "reactstrap";
import ArtistForm from "./form.artist.component";
import {createArtist, editArtist} from "./edit.artist.actions";
import ResetPassword from "./reset-password.artist.component";

class UserForm extends React.PureComponent {

  onSubmit = ({active, artistKey, name, email}) => {
    if (this.props.isNew) {
      return this.props.createArtist(active, artistKey, name, email);
    }
    else {
      return this.props.editArtist(this.props.id, active, artistKey, name, email);
    }
  };

  render() {
    return this.props.artist || this.props.isNew ?
      <Container>
        <Row>
          <Col xs={3}>
            <Link to="/">
              <Button color="link">Back</Button>
            </Link>
          </Col>
          <Col xs={6}>
            <ArtistForm onSubmit={this.onSubmit} {...this.props.artist.artist}/>
            {
              !this.props.isNew &&
              <ResetPassword lastLogin={this.props.artist.lastLogin} />
            }
          </Col>
        </Row>

      </Container>
      :
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {/* todo: add redirect*/}
        Artist not found
      </div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    id,
    isNew: !id,
    artist: id ? state.admin.dashboard.map[id] : null,
  };
};

const mapDispatchToProps = dispatcher => bindActionCreators({
  createArtist,
  editArtist,
}, dispatcher);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm));