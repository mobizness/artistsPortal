import React, {Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {Col, Container} from "reactstrap";
import get from "lodash-es/get";
import BalancesTable from "./balances/balances.component";
import {fetchBalances, filterChange, payablePgNumberClick, receivablePgNumberClick} from "./dashboard.actions";
import SpinnerLoader from "../shared/loader/spinner.loader.component";
import FilterHeader from "./filter/header.filter.component";
import Search from "./filter/search/search.component";
import ReceivablesTable from "./receivables/receivables.component";
import PayablesTable from "./payables/payables.component";
import Dropbox from "../dropbox/dropbox.container";

class ArtistDashboard extends React.Component {
  handleFetch = (month, year) => {
    const {artistKey, fetchBalances} = this.props;

    fetchBalances(artistKey, month, year);
  };

  componentDidMount() {
    const {month, year} = this.props;
    this.handleFetch(month, year);
  }

  prepareInvoices(data, path) {
    return [].concat.apply([], Object.keys(data).map(k => get(data[k], path).invoices));
  }

  render() {
    const {artistKey, status, data, month, year, filter, filterChange, receivablePgNumberClick, payablePgNumberClick} = this.props;
    return <Container>
      {
        status === 'fetching' &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SpinnerLoader height={'37px'} width={'37px'}/>
        </div>
      }
      {
        status === 'fetched' &&
        <Switch>
          <Route path={'/receivables'}>
            <Fragment>
              <div style={{marginBottom: '10px'}}>
                <Link to={'/'}>Back</Link>
              </div>
              <FilterHeader onApply={this.handleFetch} month={month} year={year}>
                <div style={{display: 'flex', justifyntent: 'space-between', alignItems: 'center'}}>
                  <Search onChange={filterChange} value={filter}/>
                </div>
              </FilterHeader>
              <ReceivablesTable onPgNumberClick={receivablePgNumberClick}
                                receivables={this.prepareInvoices(data, 'receivablesBalance')} filter={filter}/>
            </Fragment>
          </Route>
          <Route path={'/payables'}>
            <Fragment>
              <div style={{marginBottom: '10px'}}>
                <Link to={'/'}>Back</Link>
              </div>
              <FilterHeader onApply={this.handleFetch} month={month} year={year}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Search onChange={filterChange} value={filter}/>
                </div>
              </FilterHeader>
              <PayablesTable onPgNumberClick={payablePgNumberClick}
                             payables={this.prepareInvoices(data, 'payablesBalance')} filter={filter}/>
            </Fragment>
          </Route>
          <Route path={"/"}>
            <div style={{display: 'flex'}}>
              <Col xs={4}>
                <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '14px'}}>
                  <h2>Dropbox</h2>
                </div>
                <Dropbox artistKey={artistKey}/>
              </Col>
              <Col xs={8}>
                <ResetFilterWhenMount changeFilter={filterChange}>
                  <FilterHeader onApply={this.handleFetch} month={month} year={year}>
                    <h2>Balances</h2>
                  </FilterHeader>
                  <BalancesTable data={data}/>
                </ResetFilterWhenMount>
              </Col>
            </div>
          </Route>
        </Switch>
      }
    </Container>;
  }
}

class ResetFilterWhenMount extends React.Component {
  componentDidMount() {
    this.props.changeFilter('');
  }

  render() {
    return this.props.children;
  }
}

const mapStateProps = state => ({
  artistKey: state.auth.token.artistKey,
  status: state.artist.balances.status,
  month: state.artist.balances.month,
  year: state.artist.balances.year,
  data: state.artist.balances.data,
  filter: state.artist.balances.filter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBalances,
  filterChange,
  payablePgNumberClick,
  receivablePgNumberClick,
}, dispatch);

export default withRouter(connect(mapStateProps, mapDispatchToProps)(ArtistDashboard));