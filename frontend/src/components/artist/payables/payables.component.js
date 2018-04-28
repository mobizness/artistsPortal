import React, {Fragment} from 'react';
import {Table} from "reactstrap";
import moment from 'moment';
import {checkString, formatCurrency} from "../../../helpers/text";
import SortTh from "../../shared/table/sort.th.component";

class PayablesTable extends React.Component {
  changeSort = column => {
    this.setState({
      sort: column,
      asc: this.state.sort !== column ? true : !this.state.asc,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      sort: 'pgNumber',
      asc: true,
    };
  }

  render() {
    const {payables, filter, onPgNumberClick} = this.props;
    const {sort, asc} = this.state;

    let data = payables.map(payable => ({
      ...payable,
      totalPaid: payable.payments.reduce((sum, p) => (sum + p.amount), 0)
    }))
      .filter(r => checkString(filter, r.pgNumber, r.apDocument, r.rct) ||
        r.payments.filter(p => checkString(filter, p.pmt)).length ||
        ((r.amount > r.totalPaid) && checkString(filter, 'Open balance'))
      )
      .sort((a, b) => {
        if (a[sort] > b[sort]) return 1;
        if (a[sort] < b[sort]) return -1;
        return 0;
      });
    if (!asc) {
      data = data.reverse();
    }

    const SortThCell = ({children, value}) => (
      <SortTh onClick={this.changeSort} value={value} sort={{active: sort, asc}}>{children}</SortTh>
    );

    return (
      <Table>
        <thead>
        <tr>
          <SortThCell value={'pgNumber'}>PG number<br/>AP Document</SortThCell>
          <SortThCell value={'rct'}>Document</SortThCell>
          <SortThCell value={'date'}>Document Date</SortThCell>
          <SortThCell value={'amount'}>Amount</SortThCell>
        </tr>
        </thead>
        <tbody>
        {
          data.map((r, i) => {
            const totalPaid = r.payments.reduce((sum, p) => (sum + p.amount), 0);
            const hasOpen = r.amount > totalPaid;
            return <tr key={i}>
              <td><a href={'/receivables'} onClick={(e) => {
                e.preventDefault();
                onPgNumberClick(r.pgNumber);
              }}>{r.pgNumber}</a><br/>{r.apDocument}</td>
              <td>
                {r.rct}
                {r.payments.map((p, j) => (
                  <Fragment key={j}>
                    <br/>
                    <span className={'text-success'}>{p.pmt}</span>
                  </Fragment>
                ))}
                {hasOpen && <Fragment><br/><span className={'text-danger'}>Open balance</span></Fragment>}
              </td>
              <td>{moment(r.date).format('M/D/YYYY')}
                {r.payments.map((p, j) => (
                  <Fragment key={j}>
                    <br/>
                    <span className={'text-success'}>{moment(p.date).format('M/D/YYYY')}</span>
                  </Fragment>
                ))}
                {hasOpen && <Fragment><br/><span className={'text-danger'}>-</span></Fragment>}
              </td>
              <td>{formatCurrency(r.amount, r.currency)}
                {r.payments.map((p, j) => (
                  <Fragment key={j}>
                    <br/>
                    <span className={'text-success'}>{formatCurrency(p.amount, r.currency)}</span>
                  </Fragment>
                ))}
                {hasOpen &&
                <Fragment><br/><span className={'text-danger'}>{formatCurrency(r.amount - totalPaid, r.currency)}</span></Fragment>}
              </td>
            </tr>;
          })
        }
        </tbody>
      </Table>
    );
  }
}

export default PayablesTable;