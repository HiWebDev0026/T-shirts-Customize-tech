import React from "react";
import { getShirtReview } from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {useTokenDecode} from '../../hooks/tokenDecoding';
import ReviewCard from './ReviewCard';
import ReviewPost from './ReviewPost';
import Stars from './Starts';
import Style from './Reviews.module.css';

const ReviewContainer = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const shirtId = parseInt(props.match.params.id);
    const reviews = useSelector((state) => state.reviewsReducer.reviews);
    const shirts = useSelector((state) => state.shirtReducer.allShirts);
    const dispatch = useDispatch();

    reviews.length === 0 && dispatch(getShirtReview(shirtId))

    let shirt = null

    if ((!shirts) || shirts.length === 0) {
        shirt = JSON.parse(localStorage.getItem('shirt'))
    } else {
        shirt = shirts.find(shirt => parseInt(shirt.id) === shirtId)
    }

    localStorage.setItem('shirt', JSON.stringify(shirt));

    const reviewsToDisplay = [...reviews];
    reviewsToDisplay.sort((a, b) => {return parseInt(b.id) - parseInt(a.id)})
    
    return (
        <div style={{
            backgroundImage: `url(${shirt.print})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "50%", 
            backgroundSize: "50%"
            }}
        >
            <div className={Style.mainContainer}>
                <div className={Style.starPostContainer}>
                    <div>
                        {isAuthenticated && !isAdmin ? 
                            <ReviewPost userData={user} shirtId={shirtId} isAuthenticated={isAuthenticated}/>
                            :
                            <h3 className={Style.robotoFamily}>Only signed up users can send a review</h3>
                        }
                    </div>

                    <Stars reviews={reviewsToDisplay} shirtName={shirt.name}/>
                </div>
                <h2 className={Style.robotoFamily} style={{textAlign: "center", backgroundColor: 'rgba(125, 125, 125, 0.5)', margin: '60px 25% 0px 25%', borderRadius: '5px'}}>Reviews</h2>
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