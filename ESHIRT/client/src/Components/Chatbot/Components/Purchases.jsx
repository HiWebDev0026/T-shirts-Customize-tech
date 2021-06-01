import React from 'react';
import Style from './General.module.css';

function Purchases(props) {
    const options = [
        { text:'Accepted payment methods', handler: props.actionProvider.handleAcceptedPayments, id :1,},
        { text:'Discounts', handler: props.actionProvider.handleDiscounts, id :2,},
        { text:'Shipping costs', handler:props.actionProvider.handleShippingCosts, id :3,},
        { text:'Shipping areas', handler:props.actionProvider.handleShippingAreas, id :4,},
        { text:'Refunds', handler:props.actionProvider.handleRefunds, id :5,},
        { text:'Max amount per purchase', handler:props.actionProvider.handleMaxAmount, id :5,},
        { text:'Calculate my size', handler:props.actionProvider.handleCalculateSize, id :5,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btnContainer}>
        {buttons}
      </div>
    );
}
  
export default Purchases;