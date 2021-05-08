import React from 'react';
import Carousel from '../Carousel/Carousel.jsx';
import NavBar from '../NavBar/NavBar.jsx'
import {getShirts} from '../../Actions/Actions'
import {useDispatch} from 'react-redux'

export default function Home (){
    const dispatch = useDispatch()
    dispatch(getShirts())
    return(
        <div>
            <Carousel/>
        </div>
    )
};