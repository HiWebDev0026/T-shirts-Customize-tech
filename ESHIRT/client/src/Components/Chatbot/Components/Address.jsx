import React from 'react';


function Address(props) {
  const options = [
    { text:'Our address is Calle Falsa 123, dept. 8'},
]
  const address= options.map(option=><h3>{options.text}</h3>)
    return (
      <div className="Address">
        {address}
      </div>
    );
}
  
export default Address;