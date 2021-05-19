import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useSelector, useDispatch} from 'react-redux';

//import {getShirts} from '../../Actions/Actions.js'
import {getShirts} from '../../Actions/index.js'

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, {EffectCoverflow,Pagination} from 'swiper/core';

// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination]);

export default function Carousel (){

const tShirts = useSelector((state)=>state.shirtReducer.random6);
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getShirts("true"))
},[]);

    return(
        <div>
        <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
        "rotate": 50,
        "stretch": 0,
        "depth": 100,
        "modifier": 1,
        "slideShadows": true
        }} pagination={true} className='mySwiper'>
            <SwiperSlide className='create'>
                <h2 className='designTitle'>Design your own T-Shirt!</h2>
                    <Link to='/design' className="link">
                    <button className='btn'>
                        Let's Go!    
                    </button>
                    </Link>
            </SwiperSlide>
            {
                tShirts&&tShirts.map ((img)=> {
                    return (
                        <SwiperSlide>
                            <img src={img.print} alt={img.name} className='image'/>
                        </SwiperSlide>
                      );
                })
            }
            <SwiperSlide className='catalogue'>
                <h2 className='cataloguetitle'>Our catalogue ;) </h2>
                <Link className='catalogueLink' to='/catalogue'>
                    <button className='btn'>Check it out!</button>
                </Link>
            </SwiperSlide> 
        </Swiper>
    </div>
    )
};