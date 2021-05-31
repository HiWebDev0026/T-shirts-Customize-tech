import React from 'react';
import {Link} from 'react-router-dom';

function Hello(props) {
    const options = [
        { text:'I have a problem with shopping', handler: props.actionProvider.handleProblemShopping, id :1,},
        { text:'When does my shirt arrives', handler: props.actionProvider.handleShirtArrive, id :2,},
        { text:'I hate this shirt, I want my money back', handler:props.actionProvider.Refund, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler}>{option.text}</button>)
    return (
      <div >
          <h4>
            <Link to={'/catalogue'}>
                click here to check our shirts!
            </Link>
          </h4>
        
      </div>
    );
}

export default Hello;