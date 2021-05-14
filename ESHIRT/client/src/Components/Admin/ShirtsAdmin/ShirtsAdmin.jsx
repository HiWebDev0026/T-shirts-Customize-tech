import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt } from "../../../Actions";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./ShirtsAdmin.module.css";

export default function ShirtsAdmin() {

const shirts = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const [page, setPage] = useState(0);
const [max, setMax] = useState(0);
  
    useEffect(() => {
      dispatch(getShirts());
    }, []);

    function handleDelete(e) {
        alert("Shirt " + e.target.value + " deleted");
        dispatch(deleteShirt(parseInt(e.target.value))); 
      };
      function handleScroll() {
 
        let image;
        let nextImg ;
        image = Math.floor(Math.random()*1000)
        nextImg = image +1
      }
      useEffect(() => {setMax(shirts.length - 17); setPage(0);}, [shirts]);
      const nextPage = () => { page < max && setPage(page + 17); };
      const prevPage = () => { page > 0 && setPage(page - 17); };
    
    return(
      <div>

        <div className={Style.General} >
        <table id="table-to-xls">
        <div className={Style.Shirts} id='tableShirts'>
            
            <tr>
             <th className={Style.Title1}> Id-</th>
              <th className={Style.Title2}> -Name-</th>
              <th className={Style.Title3}> -Color-</th>
              <th className={Style.Title4}> -Model-</th>
              <th className={Style.Title5}>-Size-</th>
              <th className={Style.Title6}> -Score-</th>
              <th className={Style.Title7}> -Public-</th>
              <th className={Style.Title8}> -Created-</th>
              <th className={Style.Btn}>-Delete</th>
              </tr>
              </div>
              
            {shirts.length > 0 
      ? ( shirts.slice(page, page + 17).map((shirt) => {
          return (
              <div className={Style.Tarjet} >
                <tr>
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> -{shirt.name}-</th>
              <th className={Style.Titles3}> -{shirt.color}-</th>
              <th className={Style.Titles4}> -{shirt.model}-</th>
              <th className={Style.Titles5}> -{shirt.size}-</th>
              <th className={Style.Titles6}> -{shirt.score}-</th>
              <th className={Style.Titles7}> -{shirt.public}-</th>
              <th className={Style.Titles8}> -{shirt.created_by_user}-</th>
              <th><button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button></th>
              </tr>
              </div>
          );
        })
      ) 
      : (<p>Shirts not found</p>)}
      </table>
      <br />
      <div>
      <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="shirtsxls"
                    sheet="shirtsxls"
                    buttonText="Download as XLS"/>
      </div>
      <div className={Style.Buttons}>
          <button onClick={prevPage} className="buttonPrev">{" "}PREV{" "}</button>
          <button onClick={nextPage} className="buttonNext">{" "}NEXT{" "}</button>
        </div>

<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
    </div>
        </div>
    );
};