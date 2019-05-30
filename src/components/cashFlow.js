import React from 'react';

// this CashFlow is a Stateless Component
const CashFlow = ({ text, type, amount }) => {
  return (
  	<div className="col">
  	  <div className="card">
  	    <div className={`card-header bg-${type} text-white font-weight-bold`}>
  	      {text}
  	    </div>
  	    <div className="card-body">
  	      €  {amount}
  	    </div>
  	  </div>
  	</div>
  )
};

export default CashFlow;