import artistApi from '../../../../api/artist.api';
import {push} from "react-router-redux";
import {fetchArtists} from "../../dashboard.actions";

function createArtistStatus(status) {
  return {
    type: 'CREATE_ARTIST_STATUS',
    payload: {
      status,
    }
  }
}

function createArtistFailed(reason) {
  return {
    type: 'CREATE_ARTIST_STATUS',
    payload: {
      reason
    }
  }
}

export const createArtist = (active, artistKey, name, email) => dispatch => {
  dispatch(createArtistStatus(true));
  return artistApi().create(active, artistKey, name, email)
    .then(() => dispatch(createArtistStatus(false)))
    .then(() => dispatch(push('/admin')))
    .then(() => dispatch(fetchArtists()))
  // .catch(reason => dispatch(createArtistFailed(reason)));
};

export const editArtist = (id, active, artistKey, name, email) => dispatch => {
  dispatch(createArtistStatus(true));
  return artistApi().edit(id, active, artistKey, name, email)
    .then(() => dispatch(createArtistStatus(false)))
    .then(() => dispatch(push('/admin')))
    .then(() => dispatch(fetchArtists()))
  // .catch(reason => dispatch(createArtistFailed(reason)));
};