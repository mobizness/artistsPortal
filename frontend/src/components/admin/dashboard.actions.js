import artistApi from "../../api/artist.api";

function fetchArtistsStatus() {
  return {
    type: 'ARTISTS_FETCHING_START',
  }
}

function updateArtistsList(artists) {
  return {
    type: 'ARTISTS_FETCHING_SUCCESSFUL',
    payload: {
      artists
    }
  }
}

function fetchArtistsFailed(reason) {
  return {
    type: 'ARTISTS_FETCHING_FAILED',
    payload: {
      reason
    }
  }
}

export const fetchArtists = () => dispatch => {
  dispatch(fetchArtistsStatus());
  return artistApi().list()
    .then(artists => dispatch(updateArtistsList(artists)))
    .catch(reason => dispatch(fetchArtistsFailed(reason)));
};