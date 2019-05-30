import React from 'react';
import Record from './record';

// dataAPI where handles receiving data from API
import * as dataAPI from '../utils/dataAPI'
import RecordForm from './recordForm';

class List extends React.Component {
  // initialize states and bind methods
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: [
      ]
    }
  }
  /*  fetch also works
      fetch("https://5ced42a6b779120014b49f8b.mockapi.io/api/v1/records").then(function(response){
        return response.json();
      }).then(function(json){
        console.log(json);
      })
      consider its compatibility issues, use jQuery library
  */ 

  componentDidMount() {
    // utilize axious to load JSON data from a REST API
    dataAPI.getAll().then(
      // and set its response and error
      response => this.setState({
        // axios receives the response and its data already stored in .data
        records: response.data,
        isLoaded: true
      })
    // axios uses .catch() to process error status
    ).catch(
      error => this.setState({
        isLoaded: true,
        error
      })
    )
  }
  // RecordForm handleNewRecord, to add records and show records
  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  /*
    inside these records, find the edited record from the array, then update its state of List Component 
    compare index and recordIndex, if the value is different then return the updated value

    use Redux - Updating an Item in an Array
    reference: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
  */
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item
      }
      return {
        ...item,
        ...data
      }
    });
    this.setState({
       records: newRecords
    })   
  }  
  
  /*
    delete record, also use Redux method.

    when index and recordIndex is different,
    then filter() will filter out and return the records that we want,
    that is, except the deleted record, it will return new records
  */
  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });  
  }  
  render() {
    // in order to render status from the RESTful API properly, 
    // declare const for each status, that is, error, isLoaded, and records
    const { error, isLoaded, records } = this.state;
    
    let listComponent;

    // if/else if/else condition to render the corresponding contents
    if (error) {
      listComponent = <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
      listComponent =
        <div className="spinner-border text-primary" role="status">

        </div>;
    } else {
      listComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="table-secondary">Date</th>
              <th className="table-secondary">Note</th>
              <th className="table-secondary">Amount</th>
              <th className="table-secondary">Modify Records</th>
            </tr>
          </thead>
          <tbody>
            {/* <Record /> record.js to display records properly */}
            {/* render data from Record.js in an array with map() and JSX */}
            {/* then use the spread operator to expand the array into individual elements */}
            
            {records.map((record) =>
              (<Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />)
            )}  
          </tbody>
        </table>       
      );
    }
    return (
      <div>
        <h2>EveryCent List</h2>
        
        {/* <RecordForm /> recordForm.js for users to create records */}
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {listComponent}
      </div>
    );
  }
}

export default List;
