import React from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";
import moment from 'moment';


class MonthPicker extends React.Component {

  constructor(props) {
    super(props);

    const {month, year} = this.props;
    this.state = {
      month, year
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submit = () => {
    const {month, year} = this.state;
    if (this.props.onApply) {
      this.props.onApply(month, year);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month || nextProps.year !== this.state.year) {
      this.setState({
        month: nextProps.month,
        year: nextProps.year,
      })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {month, year} = this.state;
    const {disabled} = this.props;
    return (
      <div style={{display: 'flex'}}>
        <Form inline>
          <FormGroup style={{marginRight: '5px'}}>
            <Input name={'month'} type={'select'} onChange={this.handleInputChange} value={month} disabled={disabled}>
              {
                moment.months().map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))
              }
            </Input>
          </FormGroup>
          <FormGroup style={{marginRight: '5px'}}>
            <Input name={'year'} type={'number'} style={{width: '90px'}} onChange={this.handleInputChange} value={year}
                   disabled={disabled}/>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.submit} color={'link'} disabled={disabled}>Apply</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default MonthPicker;