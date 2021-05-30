import React from 'react';
import Style from './Each.module.css';
import githubImg from '../../Images/github_icon.png';
import emailImg from '../../Images/email_img.png' 

const linkedinImg = "https://paulinaacostadelrio.com/wp-content/uploads/2020/03/linkedin-png-logo-5.png"


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
                    
                    <a href={linkedin} target={"_blank"}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <img src={linkedinImg} width={"40px"} height={"40px"}/>
                            <span>LinkedIn</span>
                        </div>
                    </a>
                    <div style={{border: "1px solid black", height: "42px", marginRight: "5px", marginLeft: "10px"}}>

                    </div>
                    <a href={github} target={"_blank"}>
                        <div style={{
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center"}}>
                            <img src={githubImg} width={"40px"} height={"40px"}/>
                            <span>Github</span>
                        </div>
                    </a>
                
                    {/* <div style={{
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "center"}}>
                        <img src={emailImg} width={"50px"} height={"40px"}/>
                        <span>{web}</span>
                    </div> */}
                    
                </div>
            </div>
        </div>
    )
}

export default DogCard;
