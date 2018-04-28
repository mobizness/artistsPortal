const initialState = {
  opened: false,
  status: 'initial',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATASET_MODAL_TOGGLE':
      return {
        ...state,
        opened: !state.opened,
        status: state.status !== 'fetching' ? 'initial' : 'fetching',
      };
    case 'DATASET_MODAL_UPLOADING':
      return {
        ...state,
        status: 'fetching',
      };
    case 'DATASET_MODAL_UPLOADING_SUCCESS':
      return {
        ...state,
        status: 'completed',
      };
    case 'DATASET_MODAL_UPLOADING_FAILED':
      return {
        ...state,
        status: 'failed',
        error: action.payload.reason,
      };
    default:
      return state;
  }
};

export default reducer;