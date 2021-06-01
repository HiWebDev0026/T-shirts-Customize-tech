import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Style from './Landing.module.css';
import CarouselLanding from './CarouselLanding.jsx';
import { AiFillHome } from "react-icons/ai";


function Landing() {
    
    
    return (
        <div className={Style.general}>
           <div className={Style.picture1}>
               <div className={Style.topHomeContainer}>

                <div className={Style.section1}>
                    E-SHIRT
                </div>
                <div className={Style.section2}>
                    <div>
                    <h2>Turn ordinary into extraordinary </h2>
                    </div>
                    <Link to='/home' ><div className={Style.buttonHomeContainer}>
                    
                        <AiFillHome className={Style.home}/>
                    
                    </div>
                    </Link>
                </div>   
                </div>  
           </div>
            <section className={Style.sectionOne}>
            <div className={Style.sectionOneLeft}>
                <h2>How you do it?</h2>
                <p>Creating a T-shirt has never been easier:<br/>
                <div className={Style.list} >
                        <div>1.Log in &#128242; <br/></div>
                        <div>2.Go to design &#9997;&#127996;</div>
                        <div>3.Choose the features of your t-shirt &#128085;</div>
                        <div>4.Upload your design &#11014;&#65039;</div>
                        <div>5.Place your order 🛍️</div>
                </div>
                        You can also shop other users' designs and save them in your favorites 💛<br/>

                        What are you waiting for?
                </p>
            </div>
            <div className={Style.sectionOneRight}>
                <iframe autoplay src="https://www.youtube.com/embed/2qbr_yUMbQs?autoplay=1&mute=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            </section>
            <div className={Style.picture2}>
                <video autoplay="true" loop muted="muted">
                    <source src="https://player.vimeo.com/external/522711702.sd.mp4?s=171ebebab7fbd0b59714b8bb037766037630d514&profile_id=139&oauth2_token_id=57447761" type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
               <div className={Style.section3}>
               Top-Rated
               </div>
           </div>
           <section className={Style.sectionTwo}>
            <div className={Style.check}>
                <div className={Style.left}>
                <div className={Style.quote}>
                    <h2>"Everything you can imagine is real."</h2>
                    <h2 className={Style.picasso}>Pablo Picasso</h2>
                </div>
                <div className={Style.text}>
                    <h4>As part of this community you can rate the designs of other creatives. Check out some of the top rated ones! 👀</h4>
                </div>
                </div>
                <div className={Style.rigth}>
                    <CarouselLanding/>
                </div>
            </div>
            </section>
            <div className={Style.picture3}>
                <div className={Style.section4}>
                    <div>
                        <h2>Love what you see?</h2>
                    </div>
                    <div>
                        <h3>Go <Link to='/home'><AiFillHome className={Style.home2}/></Link> for more!</h3>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
               
        </div>
        )
}


export default Landing;