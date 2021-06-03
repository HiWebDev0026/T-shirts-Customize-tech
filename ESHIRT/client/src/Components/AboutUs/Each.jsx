import React from 'react';
import Style from './Each.module.css';
import githubImg from '../../Images/github_icon.png';
import emailImg from '../../Images/email_img.png' 

const linkedinImg = "https://paulinaacostadelrio.com/wp-content/uploads/2020/03/linkedin-png-logo-5.png"


function DogCard({name,nickName, description, image, linkedin, github, color,web, index}){
    const setImgSide = () => {
        const isEven = (parseInt(index) === 0 || index % 2 === 0) ? true : false

        return (
            <div>
                {isEven ? 
                
                <div className={Style.cardContainer}>
                    <div > {/****** 3 ITEMS  ******/}
                        <div className={Style.titlesContainer}>
                            <h1 className={Style.h1}>{name}</h1>
                            <div className={Style.as}>as</div>
                            <h3 className={Style.nick}>{nickName}</h3>
                        </div>
                        <p className={`${Style.p} ${Style.txtAlignEnd}`}>{description}</p>        
                    </div>

                    <div className={Style.separator} style={{marginRight: "180px"}}></div>

                    <div >
                        <img src={image} className={Style.img}/>
                    </div>
                    <div className={Style.links}>        
                        <a href={linkedin} target={"_blank"}>
                            <div className={Style.flexRowCenter}>
                                <img src={linkedinImg} width={"40px"} height={"40px"}/>
                                <span>LinkedIn</span>
                            </div>
                        </a>
                        <div className={Style.smallSeparator}>
                        </div>
                        <a href={github} target={"_blank"}>
                            <div className={Style.flexRowCenter}>
                                <img src={githubImg} width={"40px"} height={"40px"}/>
                                <span>Github</span>
                            </div>
                        </a>        
                    </div>


                </div>
            
                    :
                <div className={Style.cardContainer}>
                    <div className={Style.responsiveAux}>
                        <div className={Style.links}>        
                            <a href={linkedin} target={"_blank"}>
                                <div className={Style.flexRowCenter}>
                                    <img src={linkedinImg} width={"40px"} height={"40px"}/>
                                    <span>LinkedIn</span>
                                </div>
                            </a>
                            <div className={Style.smallSeparator}>
                            </div>
                            <a href={github} target={"_blank"}>
                                <div className={Style.flexRowCenter}>
                                    <img src={githubImg} width={"40px"} height={"40px"}/>
                                    <span>Github</span>
                                </div>
                            </a>        

                        </div>
                        <div >
                            <img src={image} className={Style.img}/>
                        </div>
                    </div>
                    <div className={Style.separator} style={{marginLeft: "180px"}}></div>


                    <div > {/****** 3 ITEMS  ******/}
                        <div className={Style.titlesContainer}>
                            <h1 className={Style.h1}>{name}</h1>
                            <div className={Style.as}>as</div>
                            <h3 className={Style.nick}>{nickName}</h3>
                        </div>
                        <p className={`${Style.p} ${Style.txtAlignStart}`}>{description}</p>        
                    </div>

                </div>
                }
            </div>
        )
    }
    

    return(
        <div className={Style.container} style={{backgroundColor: color}}>
            {setImgSide()}
        </div>
    )
}

export default DogCard;
