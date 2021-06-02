import React from "react";
import { useDispatch } from "react-redux";
import { getShirtReview, deleteReview} from "../../Actions/index.js";
import defaultImg from '../../Images/no_user_image.png'
import Style from './Reviews.module.css'

//className={review.image ? style.userimage : style.defaultImg}

const ReviewCard = ({review, isAdmin, shirtId}) => {
    const dispatch = useDispatch();

    function handleDelete (e){
        const idReview = parseInt(e.target.value)
        dispatch(deleteReview(idReview))  
        dispatch(getShirtReview(shirtId));  
    }

    return (
        <div className={Style.reviewCardContainer} >
            <div className={Style.cardContent}>
                <div >
                    <img
                        src={review.image || defaultImg}
                        width={"60px"}
                        height={"60px"}
                        className={Style.avatar}  
                        alt="Customer Feedback"
                    />
                </div>
                <div>
                    <h3 className={`${Style.notMargin} ${Style.robotoFamily}`}>{review.name}</h3>
                    <p className={`${Style.robotoFamilyWhite}`}>{review.content}</p>
                </div>
                <div>
                    {isAdmin && <button onClick={handleDelete} value={review.id} >x</button>}
                </div>
            </div>
            
            <div className={Style.separatorLine}></div>
        </div>
        
    )
}

export default ReviewCard;