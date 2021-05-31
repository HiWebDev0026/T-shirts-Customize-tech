import React,{useState} from 'react';
// import Carousel from '../Carousel/Carousel.jsx';

import NavBar from '../NavBar/NavBar.jsx';
import {getShirts} from '../../Actions/index';
import {useDispatch} from 'react-redux';

import ImageSlider from './ImageSlider.jsx';
import Style from './Home.module.css';
import {useWidthCheck} from '../../hooks/widthCheck';

export default function Home (){

    const [videoHome, setvideoHome]=useState(true);
    const width = useWidthCheck();
    function videoFunction (){
        return (
            <div className={Style.videoFunc}>
                
                <div className={Style.center}>
                <h1>unique personalities deserve unique t-shirts</h1>
                <div className={Style.together}>
                <video width={width < 900 ? Math.floor(width*0.85) : 600} src="https://player.vimeo.com/external/522711702.sd.mp4?s=171ebebab7fbd0b59714b8bb037766037630d514&profile_id=139&oauth2_token_id=57447761" controls autoplay muted="muted" loop>
                Your browser does not support the video tag.
                </video>
                <button onClick={()=>setvideoHome(!videoHome)}><p>GALLERY</p></button>
                </div>
                </div>
            </div>
        )
    }

    function carrouselFunction (){
        return (
            <div className={Style.center}>
               <ImageSlider/>
           </div>
        )
    }

    return(
        <div className={Style.generalHome}>
            
                {videoHome?videoFunction():carrouselFunction()}
            
            <div>

            </div>

        </div>
    )
};