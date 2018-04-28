const initialState = {
  status: 'fetching',
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DROPBOX_FETCHING_START':
      return {
        ...state,
        status: 'fetching',
      };
    case 'DROPBOX_SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        status: 'fetched',
      };
    case 'DROPBOX_FETCHING_FAILED':
      return {
        ...state,
        items: [],
        status: 'failed',
        error: action.payload.error,
      };
    case 'DROPBOX_DELETE_START':
      return {
        ...state,
        items: state.items.map(item => item.key === action.payload.key ? {
          ...item,
          isDeleting: true,
        } : item)
      };
    default:
      return state;
  }
};

export default reducer;