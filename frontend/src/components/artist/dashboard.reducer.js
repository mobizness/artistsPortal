import {combineReducers} from "redux";
import moment from "moment";

const initialState = {
  status: 'fetching',
  data: {},
  month: moment().month() + 1,
  year: moment().year(),
};

const balances = (state = initialState, action) => {
  switch (action.type) {
    case 'BALANCES_FETCHING_START':
      return {
        ...state,
        status: 'fetching',
        month: action.payload.month,
        year: action.payload.year,
      };
    case 'BALANCES_FETCHING_SUCCESS':
      return {
        ...state,
        status: 'fetched',
        data: action.payload.balances,
      };
    case 'BALANCES_FILTER_CHANGE':
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export default combineReducers({
  balances
})