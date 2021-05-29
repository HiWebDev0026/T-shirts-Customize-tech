
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShirts, getReviews} from '../../Actions/index.js'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";

import "./stylesCarouselLanding.css";
import Style from "./CarouselLanding.module.css";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);

export default function CarouselLanding() {

    const [shirtDisplay, setShirtDisplay] =useState([]);
    const dispatch = useDispatch();
   

    const sortedScores = useSelector((state)=>state.reviewsReducer.sortedScores);
    const allShirts = useSelector((state)=>state.shirtReducer.allShirts);

    console.log('AAAA',sortedScores)
    console.log('BBBBB',allShirts)

    let scoresToDisplay =[];

    useEffect(()=>{
        dispatch(getShirts());
        dispatch(getReviews());
    },[]);

    useEffect(()=>{
        if(sortedScores && allShirts.length>0){
            console.log('ENTREE')
            setShirtDisplay(scoresToDisplayFunction(sortedScores,allShirts));
            console.log('DI',shirtDisplay)
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
        console.log(result,'RESSUSULT');
        return result;
    };


  return (
      <div>
      <div>Carrusel</div>
         <Swiper pagination={true} className="mySwiper">
             {shirtDisplay.length>0?
                shirtDisplay.slice(0,11).sort((a,b)=>{return b.score-a.score}).map(shirt=>{
                    return(
                        <SwiperSlide>
                            <img src={shirt.print} atl={shirt.name}/>
                            <h2>{shirt.name}</h2>
                            <div className={Style.stars}>
                                <AiFillStar className={shirt.score>=1?Style.blackStar:Style.star}/>
                                <AiFillStar className={shirt.score>=2?Style.blackStar:Style.star}/>
                                <AiFillStar className={shirt.score>=3?Style.blackStar:Style.star}/>
                                <AiFillStar className={shirt.score>=4?Style.blackStar:Style.star}/>
                                <AiFillStar className={shirt.score>=5?Style.blackStar:Style.star}/>
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