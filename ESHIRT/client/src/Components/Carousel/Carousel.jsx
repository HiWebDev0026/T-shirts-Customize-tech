import React from 'react';
// import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

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

var tShirts = [
    {name: 'img1', image: 'https://designyourown.pk/wp-content/uploads/2017/06/design-your-own-tshirt-creo-design-02-white-programmer-t-shirt.jpg'},
    {name:'img2', image:'https://rlv.zcache.com/trust_me_im_a_programmer_t_shirt-rd8277d0fe0424aedbff652af6dcbfd49_k2gr0_704.jpg'},
    {name:'img3', image:'https://i.ebayimg.com/images/g/iz8AAOSw3bxa-tIQ/s-l400.jpg'},
    {name:'img4', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADiSQf5x6Jp-1RBYXJNVspzABU6d8pC9a7Cyhs1c5UDHFjmtEITpS1wvifwJkeF4rdv8&usqp=CAU'},
    {name:'img5', image:'https://image.spreadshirtmedia.com/image-server/v1/mp/products/T1130A2MPA3365PT17X37Y36D1016892376FS5093/views/1,width=378,height=378,appearanceId=2,backgroundColor=F2F2F2,modelId=1567,crop=list/life-of-a-coder-unisex-poly-cotton-t-shirt.jpg'},
    {name:'img6', image:'https://ae01.alicdn.com/kf/H3c52791bd1924c4c842e68faa8f0aa38h/While-Alive-Programmer-T-shirt-Live-Eat-Code-Eat-Sleep-Simple-Letter-Design-Geek-Coder-Tshirt.jpg'}
]
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
                <h2>Design your own T-Shirt!</h2>
                {/* <Link to='/design'> */}
                    <button>Let's Go!</button>
                {/* </Link> */}
            </SwiperSlide>
            {
                tShirts&&tShirts.map ((img)=> {
                    return (
                        <SwiperSlide>
                            <img src={img.image} alt={img.name}/>
                        </SwiperSlide>
                      );
                })
            }
            <SwiperSlide className='catalogue'>
                <h2>Our catalogue ;) </h2>
                {/* <Link to='/catalogue'> */}
                    <button>Check it out!</button>
                {/* </Link> */}
            </SwiperSlide> 
        </Swiper>
    </div>
    )
};