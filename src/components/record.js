import React from 'react';
import PropTypes from 'prop-types';
import * as dataAPI from '../utils/dataAPI'


export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default setting of <button>Edit and <button>Cancel is false, 
      edit: false
    };
  }
  
  // <button>Edit and <button>Cancel onClick
  // after click buttons then triggering <input> to edit or not to edit
  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }
  
  // update records 
  handleUpdate(event) {
  	event.preventDefault();
    
    //<input> already declared onChange method, here use ref to get the current value
  	const updatedRecord = {
      date: this.date.current.value,
      note: this.note.current.value,
      amount: Number.parseInt(this.amount.current.value, 0)
    };
    
    // only when receives response from the server then update record
    dataAPI.update(this.props.record.id, updatedRecord).then(
      response => {
      // once click <button>Update, edit function will be false
      this.setState({edit: false});
      this.props.handleEditRecord(this.props.record, response.data);
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  // delete records 
  handleDelete(event) {
    event.preventDefault();
    dataAPI.remove(this.props.record.id).then(
      response => this.props.handleDeleteRecord(this.props.record)
    ).catch(
      error => console.log(error.message)
    )    
  }	

  // display rows of record, and 2 main functions <button>Edit and <button>Delete
  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.note}</td>
        <td className="text-right">€ {this.props.record.amount}</td>
        <td>
          <button className="btn btn-info mr-2" onClick={this.handleToggle.bind(this)}>Edit</button>
          <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
        </td>
      </tr>
    );
  }
  
  
  /* 
     edit record, and 2 main functions <button>Update and <button>Cancel
     defaultValue{} todisplay the value of unedited.
     ref{} to get the edited value.
       string refs is deprecated by the reactjs.org, use React.createRef() method instead
  */
  editRecordForm() {
  	return (
  	  <tr>
  	    <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref={this.date} /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.note} ref={this.note} /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref={this.amount} /></td>
        <td>
          <button className="btn btn-info mr-2" onClick={this.handleUpdate.bind(this)}>Update</button>
          <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancel</button>
        </td>
      </tr>
  	);
  }
  
  /* if/else condition to determine <button>Edit is triggered or not, and its corresponding action */
  render() {
    if(this.state.edit){
      return this.editRecordForm();
    } else {
      return this.recordRow();
    }
  }
}


// run typechecking on Record component, to make sure the received data is valid. 
Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  note: PropTypes.string,
  amount: PropTypes.number
};