import React,{useState} from 'react';
// import Carousel from '../Carousel/Carousel.jsx';

import ImageSlider from './ImageSlider.jsx';
import Style from './Home.module.css';
import {useWidthCheck} from '../../hooks/widthCheck';
import {Link} from 'react-router-dom'
import bgImg from '../../Images/bgHome2.png'

export default function Home (){

    return(
        <div  className={Style.homeBg}>
            <h1>unique personalities deserve unique t-shirts</h1>
            <div className='divRelative'>
                    {/* <img src={'https://cdn.imgbin.com/13/10/15/imgbin-color-wheel-palette-yellow-laborious-pPgfj95i0YG9GPrKZ17zU9izi.jpg'} className='sliderBgImg'></img> */}
                    <ImageSlider/>
                </div>

            <div className={Style.generalHome}>
                <div className='pic1'>
                    <h3>Let's make some magic!</h3>
                    <Link to='/design'>
                        <button>Create your T-shirt</button>
                    </Link>
                    <ul>
                        <li>Choose your model</li>
                        <li>Choose the size</li>
                        <li>Choose your model</li>
                        <li>Select the color</li>
                        <li>Upload an image</li>
                        <li>Have fun!</li>
                    </ul>
                </div>

                <div className='pic2'>
                    <h3>Or...you can check out other's design</h3>
                        <Link to='/catalogue'>
                            <button>Go to Catalogue</button>
                        </Link>
                    <ul>
                        <li>Check our shirts</li>
                        <li>Check reviews</li>
                        <li>Look at discounts</li>
                        <li>Save your favorites designes</li>
                        <li>The cart is yours</li>
                        <li>Enjoy!</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};