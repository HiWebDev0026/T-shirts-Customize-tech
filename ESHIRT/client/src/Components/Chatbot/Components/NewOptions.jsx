import React from 'react';
import Style from './General.module.css';

function NewOptions({props}) {
    const options = [
      { text:'Contact Info', handler: props.actionProvider.handleContactInfo, id :1,},
      { text:'Purchases', handler: props.actionProvider.handlePurchases, id :2,},
      { text:'Designs', handler:props.actionProvider.handleDesigns, id :3,},
      { text:'Complaints', handler:props.actionProvider.handleComplaints, id :4,},
      { text:'Report Inadequate Behavior', handler:props.actionProvider.handleReport, id :5,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btnContainer}>
        {buttons}
      </div>
    );
}
  
export default NewOptions;