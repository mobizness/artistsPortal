import React, {PureComponent} from 'react';

class SortTh extends PureComponent {
  render() {
    const {children, value, onClick, sort} = this.props;
    return (
      <th onClick={() => onClick(value)} style={{cursor: 'pointer', verticalAlign: 'middle'}}>
        <div style={{display: 'flex', 'justifyContent': 'space-between', alignItems: 'center'}}>
          <span>{children}</span>
          {sort.active === value && <span style={{fontSize: '9.5px'}}>{sort.asc ? '▲' : '▼'}</span>}
        </div>
      </th>
    );
  }
}

export default SortTh;