const reactappapibase = process.env.REACT_APP_API_BASE;
const baseUrl = reactappapibase === "/" ? '' : reactappapibase;

export const toggleModal = () => ({
  type: 'DATASET_MODAL_TOGGLE',
});

function uploadStart() {
  return {
    type: 'DATASET_MODAL_UPLOADING'
  };
}

function uploadSuccess() {
  return {
    type: 'DATASET_MODAL_UPLOADING_SUCCESS',
  }
}

function uploadFailed(reason) {
  return {
    type: 'DATASET_MODAL_UPLOADING_FAILED',
    payload: {
      reason,
    }
  }
}

export const upload = (file) => dispatch => {
  dispatch(uploadStart());
  const headers = new Headers();
  const token = localStorage.getItem("pace__jwt_token");
  if (!!token) {
    headers.set("Authorization", "Bearer " + token);
  }
  const body = new FormData();
  body.append('file', file);
  return fetch(baseUrl + '/api/admin/upload', {
    headers,
    method: 'POST',
    body,
  })
    .then(response => {
      if (response.ok) {
        dispatch(uploadSuccess());
      }
      else {
        switch (response.status) {
          case 400:
            return response.json()
              .then(error => dispatch(uploadFailed(error.message.file.error)));
          default:
            return dispatch(uploadFailed('Something went wrong'));
        }
      }
    })
    .catch(reason => dispatch(uploadFailed(reason.message)));
};