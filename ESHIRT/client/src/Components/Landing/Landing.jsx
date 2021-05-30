import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Style from './Landing.module.css';
import CarouselLanding from './CarouselLanding.jsx';
import { AiFillHome } from "react-icons/ai";


function Landing() {
    
    
    return (
        <div className={Style.general}>
           <div className={Style.picture1}>
                <div className={Style.section1}>
                    E-SHIRT
                </div>
                <div className={Style.section2}>
                    <h2>Turn ordinary into extraordinary </h2>
                    <Link to='/home'>
                        <AiFillHome className={Style.home}/>
                    </Link>
                </div>     
           </div>
            <section className={Style.sectionOne}>
            <div className={Style.sectionOneLeft}>
                <h2>How to do it?</h2>
                <p>Creating a T-shirt has never been easier:<br/>
                <ol>
                        <li>Log in &#128242; <br/></li>
                        <li>Go to design &#9997;&#127996;</li>
                        <li>Choose the features of your t-shirt &#128085;</li>
                        <li>Upload your design</li>
                        <li>Place your order</li>
                </ol>
                        You can also shop other users' designs and save them in your favorites.<br/>

                        What are you waiting for?
                </p>
            </div>
            <div className={Style.sectionOneRight}>
                <iframe src="https://www.youtube.com/embed/2qbr_yUMbQs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            </section>
            <div className={Style.picture2}>
               <div className={Style.section3}>
               top-rated
               </div>
           </div>
           <section className={Style.sectionTwo}>
            <div className={Style.check}>
                <div className={Style.left}>
                    SHIRTS
                </div>
                <div className={Style.rigth}>
                    <CarouselLanding/>
                </div>
            </div>
            </section>
            <div className={Style.picture3}></div>
        </div>
        )
}


export default Landing;