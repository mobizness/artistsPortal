import api from '../../api/api';
import {stringify} from 'qs';
import {push} from "react-router-redux";

function balancesFetchStart(month, year) {
  return {
    type: 'BALANCES_FETCHING_START',
    payload: {
      month, year
    }
  };
}

function balancesFetchSuccess(balances) {
  return {
    type: 'BALANCES_FETCHING_SUCCESS',
    payload: {
      balances,
    }
  }
}

export const fetchBalances = (artistKey, month, year) => dispatch => {
  dispatch(balancesFetchStart(month, year));
  return api.get('/artist/balance?' + stringify({
    artistKey,
    month,
    year,
  })).then(response => dispatch(balancesFetchSuccess(response.data)));
};

export const filterChange = (filter) => ({
  type: 'BALANCES_FILTER_CHANGE',
  payload: {
    filter,
  }
});

export const payablePgNumberClick = (pgNumber) => dispatch => {
  dispatch(filterChange(pgNumber));
  dispatch(push('/receivables'))
};

export const receivablePgNumberClick = pgNumber => dispatch => {
  dispatch(filterChange(pgNumber));
  dispatch(push('/payables'));
};