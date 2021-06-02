import React from 'react';
import Style from './General.module.css';

function Hours(props) {
    return (
      <div className={Style.hoursContainer}>
        <h3 className={Style.hoursH3}>We're Open</h3>
        <ul className={Style.hoursUl}>
          <li>Monday to Friday: from 8am to 6pm</li>
          <li>Saturday: from 10am to 2pm</li>
          <li>Sunday and Holidays Closed!</li>
        </ul>
      </div>
    );
}

export default Hours;