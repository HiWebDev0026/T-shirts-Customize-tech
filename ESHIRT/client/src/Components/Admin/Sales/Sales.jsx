import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./Sales.module.css";

export default function Sales() {

    return(
        <div className={Style.Sales}>
             <table id="table-to-xls">
        <div className={Style.Shirts} id='tableShirts'>
            <br/>
            <tr>
             <th className={Style.Title1}> Id---------------</th>
              <th className={Style.Title2}> -------------Total Price--------</th>
              <th className={Style.Title4}> -------------Status---</th>
              <th className={Style.Title6}> -------------CreateAt-------------</th>
              <th className={Style.Title7}> -------------UpdateAt-------------</th>
              <th className={Style.Title8}> -------------UserId-------------</th>
              <th className={Style.Title9}> -------------Details-------------</th>
              </tr>
              </div>
               </table>


<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    );
};