import React from 'react';
import Style from './General.module.css';


function Complaints(props) {
    const options = [
        { text:"I didn't get a confirmation email", handler: props.actionProvider.handleAllComplaints, id :1,},
        { text:'I recive the wrong design', handler: props.actionProvider.handleAllComplaints, id :2,},
        { text:'I got a wrong size', handler:props.actionProvider.handleAllComplaints, id :3,},
        { text:'I got a wrong model', handler:props.actionProvider.handleAllComplaints, id :3,},
        { text:'I want to return my shirt', handler:props.actionProvider.handleRefunds, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btnContainer}>
        {buttons}
      </div>
    );
}
  
export default Complaints;