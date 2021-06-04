
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShirts, getReviews} from '../../Actions/index.js'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";

import "./stylesCarouselLanding.css";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
  Pagination, Mousewheel,Autoplay
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Mousewheel,Autoplay]);

export default function CarouselLanding() {

    const [shirtDisplay, setShirtDisplay] =useState([]);
    const dispatch = useDispatch();
   
    const sortedScores = useSelector((state)=>state.reviewsReducer.sortedScores);
    const allShirts = useSelector((state)=>state.shirtReducer.allShirts);

    useEffect(()=>{
        dispatch(getShirts());
        dispatch(getReviews());
    },[]);

    useEffect(()=>{
        if(sortedScores && allShirts.length>0){
            setShirtDisplay(scoresToDisplayFunction(sortedScores,allShirts));
        }
    },[sortedScores,allShirts]);

    function scoresToDisplayFunction (scores, shirts) {
        let result=scores.map(scoredShirt=>{
            for (const shirt of shirts){
                if(parseInt(scoredShirt.shirtId) === parseInt(shirt.id)){
                    shirt['score'] = scoredShirt.score;
                    return shirt;
                };
            };
        });
        return result;
    };


  return (
      <div className='general'>
      <Swiper 
      spaceBetween={30} 
      direction={'horizontal'}
      mousewheel={true} 
      autoplay={{
        "delay": 2500,
        "disableOnInteraction": false
      }}
      pagination={{"clickable": true}} 
      className="mySwiper">
             {shirtDisplay.length>0?
                shirtDisplay.slice(0,11).sort((a,b)=>{return b.score-a.score}).map(shirt=>{
                    return(
                        <SwiperSlide>
                            <div className='images'>
                                <img src={shirt.print} atl={shirt.name}/>
                            </div>
                            <div className='info'>
                                <h2>{shirt.name}</h2>
                                <div className='stars'>
                                    <AiFillStar className={shirt.score>=1?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=2?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=3?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=4?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=5?'blackStar':'star'}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
                 :''
             } 
        </Swiper>
      </div>
  )
}