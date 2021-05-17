import React from 'react';
import Each from './Each';
import Style from './AboutUs.module.css';


function AboutUs(){

    let data = [
        {
            name: "Agustin Genes",
            nickName: "The Tech Fan",
            description: "Agus is always looking for new technologies and ways of improving code",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "Daniela Cayuela",
            nickName: "The Specialist",
            description: "Dani is a team player, give her any task and she'll get it done",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "German Montori",
            nickName: "The Resercher",
            description: "Ger is constantly browsing, bringing new ideas to upgrade the proyect",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "Javier Rossi",
            nickName: "Pick a nickname for me",
            description: "Not for me to say",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "Leandro Rocco",
            nickName: "The Helper",
            description: "A true FullStack, Lean will make sure everyone gets help anytime they need it, 8 am or 11 pm",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "Emanuel Bolzico",
            nickName: "The Visual Lider",
            description: "If it looks cool and pretty, Ema was there, writting code or helping others",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
        {
            name: "Ezequiel Romio",
            nickName: "The Technical Leader",
            description: "Eze will make sure everything works as it should and is bulletproof safe",
            image: "#",
            linkedin:"",
            github:"",
            web:""
        },
    ]

    return(
        <div className={Style.container}>
            {data.map((each, index)=> <Each
                                  name={each.name}
                                  nickName={each.nickName}
                                  description={each.description}
                                  image={each.image}
                                  linkedin={each.linkedin}
                                  github={each.github}
                                  web={each.web}
                                  key={index}/>)
            }
        </div>
    )
}

export default AboutUs;