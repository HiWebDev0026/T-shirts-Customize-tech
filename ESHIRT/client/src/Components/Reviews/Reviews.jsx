import React from "react";
import style from "./Reviews.module.css";
import {getShirtReview} from '../../Actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from 'react'



function Reviews(props) {
  const dispatch = useDispatch();
  const review = useSelector(state => state.shirtReducer.shirtId)

  let id = props.match.params.id;

console.log(review[0].id)

useEffect(() => {
    dispatch(getShirtReview(id));
    
  },[]);



  return (
      <div>
      
     
   </div>
  );
}

export default Reviews;
