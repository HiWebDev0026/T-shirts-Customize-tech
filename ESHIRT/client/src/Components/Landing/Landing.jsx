import React, { useEffect, useState } from 'react';
import Style from './Landing.module.css';


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
           </div>
            <section className={Style.sectionOne}>
            <h1>SECTION1</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2qbr_yUMbQs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </section>
            <div className={Style.picture2}>
               <div className={Style.section3}>
               top-rated
               </div>
           </div>
           <section className={Style.sectionTwo}>
            <h2>SECTION2</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi et porro ullam atque ut rerum dolores fuga pariatur natus aut eum, odit autem, non deleniti quos laboriosam minima iusto est! Veritatis, non ex reiciendis nemo id impedit ad eius debitis quam libero aperiam, vero velit repellendus quos! Facere, accusamus nostrum.</p>
            </section>
            <div className={Style.picture3}></div>
            <section className={Style.sectionThree}>
            <h3>SECTION3</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti eveniet sapiente placeat aperiam accusantium veritatis illo velit, enim maiores cum assumenda soluta dolor illum est reiciendis quos quam mollitia architecto. Facere ratione doloribus nesciunt facilis maxime sapiente odio debitis! Mollitia quae provident ipsa alias corporis iure debitis voluptatem ad enim.s</p>
            </section>
            <div className={Style.picture4}></div>
        </div>
        )
}


export default Landing;