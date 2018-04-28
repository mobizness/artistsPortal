import React from 'react';
import {FormGroup, Input} from "reactstrap";
import debounce from 'lodash-es/debounce';

class Search extends React.Component {
  debouncedUpdate = debounce(query => {
    const {onChange} = this.props;
    const {lastDispatched} = this.state;

    if (lastDispatched !== query) {
      this.setState({
        lastDispatched: query
      }, () => {
        onChange(query);
      });
    }
  }, 150);
  onChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      value,
    }, () => this.debouncedUpdate(value));
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      lastDispatched: props.value || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value){
      this.setState({
        value: nextProps.value,
        lastDispatched: nextProps.value,
      })
    }
  }

  render() {
    const {value} = this.state;
    return (
      <FormGroup style={{marginBottom: '0px'}}>
        <Input value={value} onChange={this.onChange}/>
      </FormGroup>
    );
  }
}

export default Search;
