import React from 'react';

function Understanding(props) {
    const options = [
        { text:'I have a problem with shopping', handler: props.actionProvider.handleProblemShopping, id :1,},
        { text:'When does my shirt arrives', handler: props.actionProvider.handleShirtArrive, id :2,},
        { text:'I hate this shirt, I want my money back', handler:props.actionProvider.Refund, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler}>{option.text}</button>)
    return (
      <div >
      </div>
    );
}

export default Understanding;