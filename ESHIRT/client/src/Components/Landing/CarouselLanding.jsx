
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import "./stylesCarouselLanding.css";


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);


export default function CarouselLanding() {
  
    let shirts=[
        {
    
            name: "Metal!",
            print: "http://www.wellcoders.com/images/GARMENTS/D/W/V/W/MAIN/d2087xWxVxWxMAIN.jpg",
            score: "5",
        },
        {
    
            name: "Villans",
            print: "https://images1.teeshirtpalace.com/images/productImages/av/ChillinWithMyVillainsHorrorMovieFunny/productImage/ChillinWithMyVillainsHorrorMovieFunny-black-av-front.jpg?width=713",
            score: "3",
        },
        {
    
            name: "Dance",
            print: "https://cdn.shopify.com/s/files/1/0443/3113/9234/products/t-shirt-femme-jpeux-pas-jai-pole-dance-noir-494817.jpg?v=1604670113",
            score: "3",
        },
        {
    
            name: "Programmer",
            print: "https://designyourown.pk/wp-content/uploads/2017/06/design-your-own-tshirt-creo-design-02-white-programmer-t-shirt.jpg",
            score: "5",
        },
        {
    
            name: "Programmer2",
            print: "https://rlv.zcache.com/trust_me_im_a_programmer_t_shirt-rd8277d0fe0424aedbff652af6dcbfd49_k2gr0_704.jpg",
            score: "2",
        }
    ]
  
  return (
    <div className='general'>
    <Swiper spaceBetween={30} pagination={{
            "clickable": true
            }} className="mySwiper">
            {shirts.length>0?
                shirts.sort((a,b)=> b.score-a.score).map(shirt=>{
                    return <SwiperSlide><img src={shirt.print} alt={shirt.name}/></SwiperSlide>
                })
            :''
            }
  </Swiper>
    </div>
  )
}