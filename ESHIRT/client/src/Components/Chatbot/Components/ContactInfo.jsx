import React from 'react';
import Style from './General.module.css';

function ContactInfo(props) {
    const options = [
        { text:'Adress', handler: props.actionProvider.handleAddress, id :1,},
        { text:'Business Hours', handler: props.actionProvider.handleHours, id :2,},
        { text:'Phone', handler:props.actionProvider.handlePhone, id :3,},
        { text:'Email', handler:props.actionProvider.handleEmail, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btnContainer}>
        {buttons}
      </div>
    );
}

export default ContactInfo;