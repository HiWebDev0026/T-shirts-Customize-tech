import React from 'react';
import NewOptions from './NewOptions';


function Default(props) {

    return (
      <div>
       <h3>How else can we help</h3>
       <NewOptions props={props} />
      </div>
    );
}
  
export default Default;