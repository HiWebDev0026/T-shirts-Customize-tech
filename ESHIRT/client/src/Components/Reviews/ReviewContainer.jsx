import React from "react";
import { getShirtReview } from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {useTokenDecode} from '../../hooks/tokenDecoding';
import ReviewCard from './ReviewCard';
import ReviewPost from './ReviewPost';
import Style from './Reviews.module.css';

const ReviewContainer = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const shirtId = parseInt(props.match.params.id);
    const reviews = useSelector((state) => state.reviewsReducer.reviews);
    const shirts = useSelector((state) => state.shirtReducer.allShirts);
    const dispatch = useDispatch();

    reviews.length === 0 && dispatch(getShirtReview(shirtId))

    const shirt = shirts.find(shirt => parseInt(shirt.id) === shirtId)
    const reviewsToDisplay = [...reviews];
    reviewsToDisplay.sort((a, b) => {return parseInt(b.id) - parseInt(a.id)})

    console.log(shirt)
    return (
        <div style={{backgroundImage: `url(${shirt.print})`, backgroundRepeat: "no-repeat", backgroundPosition: "50%", backgroundSize: "50%"}}>
            <div className={Style.mainContainer}>
            <div>
                {isAuthenticated && !isAdmin && 
                    <ReviewPost userData={user} shirtId={shirtId} isAuthenticated={isAuthenticated}/>
                }
            </div>

            <h2>Reviews</h2>
            <div className={Style.mainContainerCards}>
                {reviewsToDisplay.length > 0 && reviewsToDisplay.map(review => {
                    return <ReviewCard review={review} isAdmin={isAdmin}/>
                })}
            </div>
            </div>
        </div>
    )
}

export default ReviewContainer;