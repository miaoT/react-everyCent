import React from 'react';

class Record extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.note}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

export default Record;
