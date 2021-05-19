import React from 'react';
import Style from './Each.module.css';


function DogCard({name,nickName, description, image, linkedin, github, web}){

    return(
        <div className={Style.container}>
            <div className={Style.left}>
                <img src={image} className={Style.img}/>
            </div>
            <div className={Style.right}>
                <h1 className={Style.h1}>{name}</h1>
                <h3 className={Style.nick}>{nickName}</h3>
                <p className={Style.p}>{description}</p>
                <div className={Style.links}>
                    <a href={linkedin}><h3>LinkedIn</h3></a>
                    <a href={github}><h3>Github</h3></a>
                    <a href={web}><h3>Web</h3></a>
                </div>
            </div>
        </div>
    )
}

export default DogCard;
