import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
                        <h4>Create your own T-shirts</h4>
                        <button>boton</button>
                    </div>
                {/* <   h3>Create your own design!</h3>
                    <img src='https://images.unsplash.com/photo-1593726856932-b5b9a661ed46?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHRzaGlydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                    alt='design'/>
                    <button>Let's Go</button> */}
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
                            <h3>Or...you can check other's design</h3>
                            <button>boton</button>
                    </div>
                {/* <img src='https://images.unsplash.com/photo-1519722417352-7d6959729417?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fHRzaGlydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    alt='design'/> */}
                </SwiperSlide>
            </Swiper>
        </div>
    )
}