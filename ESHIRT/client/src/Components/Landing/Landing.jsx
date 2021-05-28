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
                    Turn ordinary into extraordinary 
                </div>
                <Link to='/home'>
                    <AiFillHome className={Style.home}/>
                </Link>
           </div>
            <section className={Style.sectionOne}>
            <div className={Style.sectionOneLeft}>
                <h2>Hoe does it work?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolores commodi atque, voluptas exercitationem eveniet tenetur illo, nobis cupiditate laudantium nihil fugit quos reprehenderit, provident nisi ut tempora repellat? Eaque.</p>
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