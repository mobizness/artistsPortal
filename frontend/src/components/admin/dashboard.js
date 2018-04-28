import React, {Fragment} from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {Button, Container} from "reactstrap";
import ArtistTable from './artist/table/table.artist.component';
import SpinnerLoader from "../shared/loader/spinner.loader.component";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchArtists} from "./dashboard.actions";
import {toggleModal} from "./dataset/dataset.actions";
import ArtistForm from "./artist/form/edit.artist.component";
import UploadDatasetModal from "./dataset/dataset.container";

class AdminDashboard extends React.Component {
  componentDidMount() {
    this.props.fetchArtists();
  }

  render() {
    const {status, error, artists, toggleModal} = this.props;
    return (
      <Container>
        {
          (status === 'preloader' || status === 'fetching') &&
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <SpinnerLoader height={'37px'} width={'37px'}/>
          </div>
        }
        {
          status === 'fetched' &&
          <Switch>
            <Route path={'/artists/edit/:id?'}>
              <ArtistForm/>
            </Route>
            <Route path={'/'}>
              <Fragment>
                <div style={{display: 'flex', justifyContent: "flex-end", padding: '0.5rem 0'}}>
                  <Button color="link" onClick={() => toggleModal()}>Upload Dataset</Button>
                  <Link to={"/artists/edit"}>
                    <Button color="primary">Add User</Button>
                  </Link>
                </div>
                <div style={{display: 'flex', padding: '0.5rem 0'}}>
                  <ArtistTable items={artists}/>
                </div>
              </Fragment>
            </Route>
          </Switch>
        }
        {
          status === 'fetch_failed' &&
          <div>
            {error}. Try again later
          </div>
        }
        <UploadDatasetModal />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  status: state.admin.dashboard.status,
  error: state.admin.dashboard.error,
  artists: state.admin.dashboard.ids.map(id => state.admin.dashboard.map[id]),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchArtists,
  toggleModal,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDashboard));