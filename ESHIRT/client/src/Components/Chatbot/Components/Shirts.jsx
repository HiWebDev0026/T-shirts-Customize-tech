import React from 'react';
import {Link} from 'react-router-dom';

function Shirts(props) {
    const options = [
        { text:'I have a problem with shopping', handler: props.actionProvider.handleProblemShopping, id :1,},
        { text:'When does my shirt arrives', handler: props.actionProvider.handleShirtArrive, id :2,},
        { text:'I hate this shirt, I want my money back', handler:props.actionProvider.Refund, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler}>{option.text}</button>)
    return (
      <div>
            <Link to={'/catalogue'}>
                <h5 style={{
                    color: 'dodgerblue', 
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    padding: '10px',
                    border: '2px solid dodgerblue'
                    }}>
                    click here to check our shirts!
                </h5>
            </Link>
            <Link to={'/design'}>
                <h5 style={{
                    color: 'dodgerblue', 
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    padding: '10px',
                    border: '2px solid dodgerblue'
                    }}>
                    click here to create a new design!
                </h5>
            </Link>
      </div>
    );
}

export default Shirts;