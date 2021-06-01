import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {getShirt, getShirts} from '../../Actions/index.js';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import './stylesImageSlider.css';

// import Swiper core and required modules
import SwiperCore, {
    Pagination
  } from 'swiper/core';
  
  // install Swiper modules
  SwiperCore.use([Pagination]);

export default function ImageSlider (){

    const tShirts=useSelector((state)=> state.shirtReducer.random10);
    console.log('TSHIRTS', tShirts)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getShirts('true'));
    },[])

    return (
        <div className='slider'>
            <Swiper slidesPerView={3} spaceBetween={30} slidesPerGroup={3} loop={true} loopFillGroupWithBlank={true} pagination={{
            "clickable": true
            }}  className="mySwiper">
                <SwiperSlide className='design'>
                    <div className='pic1'>
                        <h3>Let's make some magic!</h3>
                        <Link to='/design'>
                            <button>Create your T-shirt</button>
                        </Link>
                    </div>
                </SwiperSlide>
                {
                    tShirts.length>0?
                        tShirts.map(shirt=>{
                            return(
                                <SwiperSlide>
                                    <img src={shirt.print} alt={shirt.name} width='10px'/>  
                                </SwiperSlide>
                            )
                        })
                        :''
                }
                <SwiperSlide className='catalogue'>
                    <div className='pic2'>
                            <h3>Or...you can check out other's design</h3>
                            <Link to='/catalogue'>
                                <button>Go to Catalogue</button>
                            </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}