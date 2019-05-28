import React from 'react';
import Record from './record';
import { getJSON } from 'jquery';

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
  // utilize jQuery library to load JSON data from a RESTful API
  getJSON("https://5ced42a6b779120014b49f8b.mockapi.io/api/v1/records").then(
    // and set its response and error
    response => this.setState({
      records: response,
      isLoaded: true
    }),
    error => this.setState({
      isLoaded: true,
      error
    })
  )
}

  render() {
    // in order to render status from the RESTful API properly, 
    // declare const for each status, that is, error, isLoaded, and records
    const { error, isLoaded, records } = this.state;
    
    // if/else if/else condition to render the corresponding contents
    if (error) {
      return <div>Error: {error.responseText} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>
    } else {
      return (
        <div>
          <h2>EveryCent List</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Note</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* <Record /> Record.js to display records properly */}
              {/* render data from Record.js in an array with map() and JSX */}
              {/* then use the spread operator to expand the array into individual elements */}
              {this.state.records.map((record) => <Record key={record.id} {...record} />)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default List;
