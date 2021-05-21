import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


import FavoritesItems from './FavoritesItems.jsx';
import {getShirts,postFavorite,getFavorites} from '../../Actions/index.js';

import Style from './Favorites.module.css'

export default function Favorites (){

    const dispatch=useDispatch();

    useEffect(async ()=>{
        await dispatch(getShirts());
        dispatch(getFavorites('105677628845670307414'));
    },[]);

 
    const favorites = useSelector((state)=>state.shirtReducer.shirtsToFavorites);
    
    function handleClick (e){
        console.log('ID',e.target.id)
        dispatch(postFavorite('105677628845670307414',{shirtId:e.target.id}));
    }
    
    return(
        <div className={Style.container}>
                <h1>Favorites</h1>
                <div className={Style.info}>
                {favorites.length>0?
                favorites.map(favorite => 
                    {return<FavoritesItems key={favorite.id} favorite={{...favorite, price:50}}/>})
                :<p>No items in favorites</p>}
            </div>
            <button id='1' onClick={handleClick}>1</button>
            <button id='2' onClick={handleClick}>2</button>
            <button id='3' onClick={handleClick}>3</button>
            <button id='4' onClick={handleClick}>4</button>
            <button id='5' onClick={handleClick}>5</button>
            <button id='6' onClick={handleClick}>6</button>
            <button id='7' onClick={handleClick}>7</button>
            <button id='8' onClick={handleClick}>8</button>
            <button id='9' onClick={handleClick}>9</button>
        </div>
    )
}