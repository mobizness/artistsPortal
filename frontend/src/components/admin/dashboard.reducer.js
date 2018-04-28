import {combineReducers} from "redux";
import modal from './dataset/dataset.reducer';
import dropboxModal from './dropbox/admin.dropbox.reducer';

const initialState = {
  ids: [],
  map: {},
  status: 'preloader',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ARTISTS_FETCHING_START':
      return {
        ...state,
        status: 'fetching',
      };
    case 'ARTISTS_FETCHING_FAILED':
      return {
        ...state,
        status: 'fetch_failed',
        error: action.payload.reason,
      };
    case 'ARTISTS_FETCHING_SUCCESSFUL': {
      const ids = [];
      const map = {};
      action.payload.artists.forEach(a => {
        ids.push(a.artist.id);
        map[a.artist.id] = a;
      });
      return {
        ...state,
        status: 'fetched',
        ids,
        map,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  dashboard: reducer,
  modal: modal,
  dropbox: dropboxModal,
});