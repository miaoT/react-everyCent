import React from 'react';
import * as dataAPI from '../utils/dataAPI'

export default class RecordForm extends React.Component {
  // initialize states and bind methods
  constructor(props) {
    super(props);
    // the default value of <input> is an empty string
    this.state = {
      date: "",
      note: "",
      amount: ""
    }
  }
  
  // onChange
  handleChange(event) {
  	let name, obj;
  	name = event.target.name;
  	this.setState((
  	  obj = {},
  	  obj["" + name] = event.target.value,
      obj
    ));
  }
  
  // after user typed, then <button>Create record can function
  isTyped() {
    return this.state.date && this.state.note && this.state.amount
  }
  // onSubmit
  handleSubmit(event) {
  	event.preventDefault();
  	const userInput = {
      date: this.state.date,
      note: this.state.note,
      // convert amount into an integer, not a string
      amount: Number.parseFloat(this.state.amount)
    };
    
    // create records and update records from List Component
    dataAPI.create(userInput).then(
      response => {
      	this.props.handleNewRecord(response.data);
        // after clicked <button>Create record, the <input> will clear its value
        this.setState({
          date: "",
          note: "",
          amount: ""
        })
      }
    ).catch(
      error => console.log(error.message)
    )
  }	
  render() {
    return(
      <form className="form-inline mt-5 mb-4" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group mr-2">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date}/>
        </div>
        <div className="form-group mr-2">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Note" name="note" value={this.state.note}/>
        </div>
        <div className="form-group mr-2">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.isTyped()}>Save record</button>
      </form>
  	);
  }

}