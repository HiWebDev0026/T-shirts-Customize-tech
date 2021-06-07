import React from "react";
import Style from './Reviews.module.css'

const Stars = ({reviews, shirtName}) => {
    
    const setAverage = () => { 
        let score = 0;
        for (const review of reviews) {
            score += parseInt(review.scoreReview)
        }
        return Math.ceil(score / reviews.length)
    }

    const setStarsToDisplay = (score) => {
        const stars = [];
        for (let i=0; i < score; i++) {
            stars.push(<i className={Style.star}>★</i>)
        }
        return stars
    }

    const stars = setStarsToDisplay(setAverage())

    return (
        <div className={Style.starDiv}>
            <h1 className={Style.shadowsFamily}>{shirtName}</h1>
            <div>
                {stars.map(star => star)}
            </div>
        </div>
    )
}

export default Stars;