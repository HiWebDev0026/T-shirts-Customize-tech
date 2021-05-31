import React, { useState, useEffect } from 'react'



function useWidthCheck () {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=> {

        const setWindowWidth = (e) => {

            return setWidth(prevWidth => prevWidth = window.innerWidth);
        }

        window.addEventListener('resize', setWindowWidth);



        return ()=> window.removeEventListener('resize', setWindowWidth);
    }, [])

    return width;
}

export {useWidthCheck}