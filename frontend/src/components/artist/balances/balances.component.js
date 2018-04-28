import React, {Fragment} from 'react';
import {Table} from "reactstrap";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../../helpers/text";

class BalancesTable extends React.PureComponent {

  render() {
    const { data} = this.props;
    return (
      <Table>
        <thead>
        <tr>
          <th style={{width: '50%'}}>Account</th>
          <th>Open</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {
          Object.keys(data).map(currency => (
            <Fragment key={currency}>
              <tr>
                <td>
                  <Link to={'/receivables'}>Receivables {currency}</Link><br/>
                  from Client
                </td>
                <td>
                  {formatCurrency(data[currency].receivablesBalance.open, currency)}
                </td>
                <td>
                  {formatCurrency(data[currency].receivablesBalance.total, currency)}
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={'/payables'}>Payables {currency}</Link><br/>
                  to Artist
                </td>
                <td>
                  {formatCurrency(data[currency].payablesBalance.open, currency)}
                </td>
                <td>
                  {formatCurrency(data[currency].payablesBalance.total, currency)}
                </td>
              </tr>
            </Fragment>
          ))
        }
        </tbody>
      </Table>
    );
  }
}

export default BalancesTable;