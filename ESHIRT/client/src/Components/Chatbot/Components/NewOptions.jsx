import React from 'react';

function NewOptions({props}) {
    const options = [
        { text:'Our address', handler: props.actionProvider.handleAddress, id :1,},
        { text:'Our opening hours', handler: props.actionProvider.handleHours, id :2,},
        { text:'Solving Problems', handler:props.actionProvider.handleProblems, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} >{option.text}</button>)
    return (
      <div>
        {buttons}
      </div>
    );
}
  
export default NewOptions;