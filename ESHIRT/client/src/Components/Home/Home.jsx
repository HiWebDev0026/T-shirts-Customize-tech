import React, { useRef, useState, useEffect } from "react";
import {Link} from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { getShirts, getReviews} from '../../Actions/index.js';
import { AiFillStar } from "react-icons/ai";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import style from "./SwiperStyles.module.css";
import {useSelector} from 'react-redux'

// import Swiper core and required modules
import SwiperCore, {
  Parallax,Pagination,Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Parallax,Pagination,Navigation]);


export default function App() {
  
  const tShirts=useSelector((state)=> state.shirtReducer.random10);
  const reviews= [
    "Great place to make your own personal shirt! - Ricky Bobby",
    "The best birthday present - Marta Cuzman",
    "Done it in only 5 min for my sister - Lucas Aguero",
    "I felt like a designer - Agustin Gonzalez",
    "First design I've ever made and it looked beautifull! - Amy James",
    "It's awesome, you can do anything on your mind! - Ezequiel Otero Tracey",
    "A friend recommended it to me, and man, he was right about it! - Joan Zorovich",
    "It really exceeded my expectations - Federico Bombay",
    "I thought they were gonna be so expensive, but they really are affordable and have a good quality! - Jessica Korn",
    "So easy to use and it looks so good! - Jake Crain"
  ]

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
    
  <div className={style.home}>
    <Swiper style={{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff'
      }} 
      speed={600} 
      parallax={true} 
      pagination={{
        "clickable": true
      }} 
      navigation={true} 
      className={style.swiperContainer}
      autoplay={{
        "delay": 4000,
        "disableOnInteraction": false
      }}>
      <div slot="container-start" className={style.parallaxBg} data-swiper-parallax="-23%"></div>
        {
            shirtDisplay.length>0?
            shirtDisplay.slice(0,11).sort((a,b)=>{return b.score-a.score}).map((shirt, index)=>{
              return(
                <SwiperSlide className={style.swiperItem}>
                  <img className={style.swiperCard} src={shirt.print} alt={shirt.name}/>  
                  <h2>
                    <i>
                      {
                        index < reviews.length ?
                        reviews[index]
                            :
                            ''
                      }
                    </i>
                    <h3>{shirt.name}</h3>
                    <div className='stars'>
                                    <AiFillStar className={shirt.score>=1?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=2?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=3?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=4?'blackStar':'star'}/>
                                    <AiFillStar className={shirt.score>=5?'blackStar':'star'}/>
                                </div>

                  </h2>
                </SwiperSlide>
              )
            })
            :''
        }
    </Swiper>
    <div className={style.toThePage}>
      <div className={style.pic1}>
          <h2>Let's make some magic!</h2>
          <Link to='/design'>
            <button>Create your T-shirt</button>
          </Link>
      </div>
      <div className={style.pic2}>
        <Link to='/catalogue'>
          <button>Go to Catalogue</button>
        </Link>
      </div>
    </div>
  </div>  
  )
}