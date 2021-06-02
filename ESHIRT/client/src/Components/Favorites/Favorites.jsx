import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactPaginate from 'react-paginate';

import { HiArrowCircleLeft,HiArrowCircleRight } from "react-icons/hi";
import FavoritesItems from './FavoritesItems.jsx';
import {getShirts,postFavorite,getFavorites} from '../../Actions/index.js';
import { useAuth0} from "@auth0/auth0-react";

import Style from './Favorites.module.css'

export default function Favorites (){

    const [currentPage, setCurrentPage] = useState(0);

    const {user}=useAuth0();

    const userId = user.sub.split('|')[1];

    const dispatch=useDispatch();

    useEffect(async ()=>{
        await dispatch(getShirts());
        dispatch(getFavorites(userId));
    },[]);

 
    const favorites = useSelector((state)=>state.shirtReducer.shirtsToFavorites);

    const INITIAL_PAGE= 5;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(favorites.length / INITIAL_PAGE);
    
    function handleClick (e){
        dispatch(postFavorite(userId,{shirtId:e.target.id}));
    }

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    
    return(
        <div className={Style.container}>
                <h1>Your ❤s</h1>
                <div className={Style.info}>
                {favorites.length>0?
                favorites.slice(offset, offset + INITIAL_PAGE).map(favorite => 
                    {return<FavoritesItems key={favorite.id} favorite={{...favorite, price:favorite.price}}/>})
                :<p>No items in favorites</p>}
                </div>
                <div className={Style.pages}>
                    <ReactPaginate
                        previousLabel={<HiArrowCircleLeft/>}
                        nextLabel={<HiArrowCircleRight/>}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}        
                        previousLinkClassName={Style.pagination__link}
                        nextLinkClassName={Style.pagination__link}
                        disabledClassName={Style.pagination__link__disabled}
                        activeClassName={Style.pagination__link__active}
                        containerClassName={Style.pagination}
                    />  
                </div>
        </div>
    )
}