import React from 'react';
import MonthPicker from "./monthpicker/monthpicker.component";

class FilterHeader extends React.PureComponent {
  render() {
    const {children, onApply, disabled, month, year} = this.props;
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
        <div>
          {children}
        </div>
        <MonthPicker onApply={onApply} disabled={disabled} month={month} year={year}/>
      </div>
    );
  }
}

export default FilterHeader;