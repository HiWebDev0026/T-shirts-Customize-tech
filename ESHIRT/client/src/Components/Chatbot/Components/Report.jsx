import React from 'react';
import Style from './General.module.css';

function Report(props) {
    const options = [
        { text:'There is an offensive comment', handler: props.actionProvider.handleOffensiveComment, id :1,},
        { text:'There is an offensive design', handler: props.actionProvider.handleOffensiveDesign, id :2,},
    ]
    const buttons = options.map(option=><button key={option.id} onClick={option.handler} className={Style.btn} >{option.text}</button>)
    return (
      <div className={Style.btn}>
        {buttons}
      </div>
    );
}
  
export default Report;