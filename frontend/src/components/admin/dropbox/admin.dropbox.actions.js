import api from '../../../api/api';
import {fetchDropbox} from "../../dropbox/dropbox.actions";

export const toggleDropboxModal = () => ({
  type: 'DROPBOX_MODAL_TOGGLE'
});

function uploadStart() {
  return {
    type: 'DROPBOX_MODAL_UPLOADING'
  };
}

function uploadSuccess() {
  return {
    type: 'DROPBOX_MODAL_UPLOADING_SUCCESS',
  }
}

function uploadFailed(reason) {
  return {
    type: 'DROPBOX_MODAL_UPLOADING_FAILED',
    payload: {
      reason,
    }
  }
}

export const uploadToDropbox = (artistKey, file) => dispatch => {
  dispatch(uploadStart());
  const body = new FormData();
  body.append('artistKey', artistKey);
  body.append('file', file);

  api.post('/admin/dropbox/upload', body)
    .then(response => {
      switch (response.status) {
        case 200: {
          dispatch(uploadSuccess());
          return Promise.resolve();
        }
        case 400:
          return response.json()
            .then(error => dispatch(uploadFailed(error.message.file.error)));
        default:
          return dispatch(uploadFailed('Something went wrong'));
      }
    })
    .then(() => dispatch(fetchDropbox(artistKey)))
    .catch(reason => dispatch(uploadFailed(reason.message)));
};

export const deleteFile = key => {
  return api.get(`/admin/dropbox/delete?key=${key}`);
};