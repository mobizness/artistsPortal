import React from "react";
import './loader.css';

class SpinnerLoader extends React.PureComponent {
  render() {
    const { width, height } = this.props;
    return (
      <div className="loader loader-spinner" style={{width, height}}>
      </div>
    );
  }
}

export default SpinnerLoader;