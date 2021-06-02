import React, { useState, useEffect } from 'react';
import Style from './Clock.module.css';

function Clock(){

    const [clock, setClock] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            var date = new Date();
            var hour = date.getHours(); 
            var min = date.getMinutes(); 
            var second = date.getSeconds(); 
        
        if(second < 10 && min < 10){
            setClock( `${hour} : 0${min} : 0${second}`);
        }
        else if(second < 10){
            setClock( `${hour} : ${min} : 0${second}`);
        }else if(min < 10){
            setClock( `${hour} : 0${min} : ${second}`);
        }
        else setClock( `${hour} : ${min} : ${second}`);

    }, 1000);
        return () => clearInterval(interval);
  }, []);


    return(
        <div className={Style.container}>   
            <span>{clock}</span>
        </div>
    )
}

export default Clock;


    
