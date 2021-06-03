import React from 'react'
import Style from './General.module.css';

function Toni(props) {
    return (
      <div className={Style.hoursContainer}>
        <ul className={Style.hoursUl}>
          <li><a href="https://www.instagram.com/visual_fercho/">Fernando Suarez</a></li>
          <li><a href="https://www.instagram.com/ana.forlano/">Ana Forlano</a></li>
          <li><a href="https://www.instagram.com/keba/">Keba</a></li>
        </ul>
      </div>
    );
}

export default Toni;