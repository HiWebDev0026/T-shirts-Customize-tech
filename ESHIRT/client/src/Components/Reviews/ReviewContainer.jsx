import React from "react";
import { getShirtReview, postShirtReview, getShirtScore, deleteReview} from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {useTokenDecode} from '../../hooks/tokenDecoding';
import {useHistory} from 'react-router-dom'
import defaultImg from '../../Images/no_user_image.png'
import ReviewCard from './ReviewCard';
import ReviewPost from './ReviewPost';

const ReviewContainer = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const shirtId = parseInt(props.match.params.id);
    const reviews = useSelector((state) => state.reviewsReducer.reviews);
    const dispatch = useDispatch();


    reviews.length === 0 && dispatch(getShirtReview(shirtId))

    return (
        <div>
            <div>
                {isAuthenticated && !isAdmin && 
                    <ReviewPost userData={user} shirtId={shirtId} isAuthenticated={isAuthenticated}/>
                }
            </div>
            <div>
                {reviews.length > 0 && reviews.map(review => {
                    return <ReviewCard review={review} isAdmin={isAdmin}/>
                })}
            </div>
        </div>
    )
}

export default ReviewContainer;