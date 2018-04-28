import api from '../../api/api';

function fetchStart() {
  return {
    type: 'DROPBOX_FETCHING_START',
  };
}

const fetchFailed = error => ({
  type: 'DROPBOX_FETCHING_FAILED',
  payload: {
    error,
  }
});

const setItems = items => ({
  type: 'DROPBOX_SET_ITEMS',
  payload: {
    items,
  }
});

export const fetchDropbox = artistKey => dispatch => {
  dispatch(fetchStart());
  api.get(`/dropbox?artistKey=${artistKey}`)
    .then(response => dispatch(setItems(response.data)))
    .catch(error => dispatch(fetchFailed(error)));
};

export const deleteFile = (artistKey, key, deleteFn) => dispatch => {
  dispatch({
    type: 'DROPBOX_DELETE_START',
    payload: {
      key,
    }
  });
  deleteFn(key).then(() => dispatch(fetchDropbox(artistKey)));
};