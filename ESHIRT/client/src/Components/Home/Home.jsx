import React,{useState} from 'react';
// import Carousel from '../Carousel/Carousel.jsx';

import ImageSlider from './ImageSlider.jsx';
import Style from './Home.module.css';
import {useWidthCheck} from '../../hooks/widthCheck';


export default function Home (){

    return(
        <div className={Style.generalHome}>
            <div>
                <h1>unique personalities deserve unique t-shirts</h1>
                <ImageSlider/>
            </div>
            <div>

            </div>

        </div>
    )
};