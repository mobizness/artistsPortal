import React from 'react';
import {Table} from "reactstrap";
import moment from 'moment';
import {checkString, formatCurrency} from "../../../helpers/text";
import SortTh from "../../shared/table/sort.th.component";

class ReceivablesTable extends React.Component {
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
    const {receivables, filter, onPgNumberClick} = this.props;
    const {sort, asc} = this.state;

    let data = receivables.filter(r => checkString(filter, r.pgNumber, r.invoiceId, r.clientName))
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
          <SortThCell value={'pgNumber'}>PG number</SortThCell>
          <SortThCell value={'invoiceId'}>Invoice Number</SortThCell>
          <SortThCell value={'date'}>Invoice Date</SortThCell>
          <SortThCell value={'amount'}>Amount</SortThCell>
          <SortThCell value={'balance'}>Balance</SortThCell>
          <SortThCell value={'clientName'}>Customer Name</SortThCell>
        </tr>
        </thead>
        <tbody>
        {
          data.map((r, i) => (
            <tr key={i}>
              <td><a href={'/payables'} onClick={(e) => {
                e.preventDefault();
                onPgNumberClick(r.pgNumber);
              }}>{r.pgNumber}</a></td>
              <td>{r.invoiceId}</td>
              <td>{moment(r.date).format('M/D/YYYY')}</td>
              <td>{formatCurrency(r.amount, r.currency)}</td>
              <td className={r.amount > r.balance ? 'text-danger' : ''}>{formatCurrency(r.balance, r.currency)}</td>
              <td>{r.clientName}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    );
  }
}

export default ReceivablesTable;