import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt } from "../../../Actions";
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
      useEffect(() => {setMax(shirts.length - 9); setPage(0);}, [shirts]);
      const nextPage = () => { page < max && setPage(page + 9); };
      const prevPage = () => { page > 0 && setPage(page - 9); };
    
    return(
        <div className={Style.General}>
        <div className={Style.Shirts}>
            <h3 className={Style.Title1}> Id---</h3>
              <h3 className={Style.Title2}> -------Name------</h3>
              <h3 className={Style.Title3}> ------Color------</h3>
              <h3 className={Style.Title4}> -------Model-----</h3>
              <h3 className={Style.Title5}>------Size------ </h3>
              <h3 className={Style.Title6}> -----Score----- </h3>
              <h3 className={Style.Title7}> -----Public-----</h3>
              <h3 className={Style.Title8}> -----Created------</h3>
              <h3 className={Style.Btn}>Delete</h3>
              </div>
              
            {shirts.length > 0 
      ? ( shirts.slice(page, page + 9).map((shirt) => {
          return (
            <div id='gri' onScroll={handleScroll}>
              <div className={Style.Tarjet}>
              <p className={Style.Titles1}> {shirt.id}</p>
              <p className={Style.Titles2}> {shirt.name}</p>
              <p className={Style.Titles3}> {shirt.color}</p>
              <p className={Style.Titles4}> {shirt.model}</p>
              <p className={Style.Titles5}> {shirt.size}</p>
              <p className={Style.Titles6}> {shirt.score}</p>
              <p className={Style.Titles7}> {shirt.public}</p>
              <p className={Style.Titles8}> {shirt.created_by_user}</p>
              <button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button>
              </div>
              </div>
          );
        })
      ) 
      : (<p>Shirts not found</p>)}
      <div className={Style.Buttons}>
          <button onClick={prevPage} className="buttonPrev">{" "}PREV{" "}</button>
          <button onClick={nextPage} className="buttonNext">{" "}NEXT{" "}</button>
        </div>

<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    );
};