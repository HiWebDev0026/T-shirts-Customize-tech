import React from "react";
import style from "./Reviews.module.css";
import {getShirtReview} from '../../Actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from 'react'



function Reviews() {
  const dispatch = useDispatch();
  




// useEffect(() => {
//     dispatch(getShirtReview())
// }, [])






  return (
      <div>
      <p>Holaaaa</p>
   </div>
  );
}

export default Reviews;
