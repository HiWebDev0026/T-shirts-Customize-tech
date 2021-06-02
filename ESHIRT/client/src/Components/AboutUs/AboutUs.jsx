import React from 'react';
import Each from './Each';
import Style from './AboutUs.module.css';


function AboutUs(){
    const colors = ["#2364aa", "#3da5d9", "#73bfb8", "#33cc33","#fec601", "#ea7317", "#ff6666"]
    let data = [
        {
            name: "Agustin Genes",
            nickName: "The Tech Fan",
            description: "Agus is always looking for new technologies and ways of improving code",
            image: "https://avatars.githubusercontent.com/u/60836025?v=4",
            linkedin:"https://www.linkedin.com/in/agustin-genes-dev/",
            github:"https://github.com/aagenesds22",
            web:""
        },
        {
            name: "Daniela Cayuela",
            nickName: "The Specialist",
            description: "Dani is a team player, give her any task and she'll get it done",
            image: "https://avatars.githubusercontent.com/u/75386133?v=4",
            linkedin:"https://www.linkedin.com/in/daniela-cayuela-tovar-dev/",
            github:"https://github.com/danielacayuela",
            web:""
        },
        {
            name: "German Montori",
            nickName: "The Resercher",
            description: "Ger is constantly browsing, bringing new ideas to upgrade the proyect",
            image: "https://avatars.githubusercontent.com/u/76887226?v=4",
            linkedin:"https://www.linkedin.com/in/german-luis-montori/",
            github:"https://github.com/Montori86",
            web:""
        },
        {
            name: "Javier Rossi",
            nickName: "The Philosopher",
            description: "Javi is the soul of this team, the connection between code and life",
            image: "https://avatars.githubusercontent.com/u/75333865?v=4",
            linkedin:"https://www.linkedin.com/in/javier-rossi-fullstack-react/",
            github:"https://github.com/AhsokasPadawan",
            web:""
        },
        {
            name: "Leandro Rocco",
            nickName: "The Helper",
            description: "A true FullStack, Lean will make sure everyone gets help anytime they need it, 8 am or 11 pm",
            image: "https://avatars.githubusercontent.com/u/74310843?v=4",
            linkedin:"https://www.linkedin.com/in/leandro-rocco/",
            github:"https://github.com/rocco9022",
            web:""
        },
        {
            name: "Emanuel Bolzico",
            nickName: "The Visual Lider",
            description: "If it looks cool and pretty, Ema was there, writting code or helping others",
            image: "https://avatars.githubusercontent.com/u/75394517?v=4",
            linkedin:"https://www.linkedin.com/in/emanuelbolzico/",
            github:"https://github.com/ebolzico",
            web:""
        },
        {
            name: "Ezequiel Romio",
            nickName: "The Technical Leader",
            description: "Eze will make sure everything works as it should and is bulletproof safe",
            image: "https://avatars.githubusercontent.com/u/73430686?v=4",
            linkedin: "https://www.linkedin.com/in/romioezequiel/",
            github:"https://github.com/EzequielRomio",
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
                                  color={colors[index]}
                                  index={index}
                                  key={index}/>)
            }
        </div>
    )
}

export default AboutUs;