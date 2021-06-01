import React from 'react';
import Style from './General.module.css';


function Designs(props) {
    const options = [
        { text:'Available colors', handler: props.actionProvider.handleAvailableColors, id :1,},
        { text:'Shirt materials', handler: props.actionProvider.handleShirtMaterials, id :2,},
        { text:'I want to make my design private', handler:props.actionProvider.handlePrivateDesign, id :3,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btnContainer}>
        {buttons}
      </div>
    );
}
  
export default Designs;