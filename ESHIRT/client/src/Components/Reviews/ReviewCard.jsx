import React from "react";
import { useDispatch } from "react-redux";
import { getShirtReview, deleteReview} from "../../Actions/index.js";
import defaultImg from '../../Images/no_user_image.png'

//className={review.image ? style.userimage : style.defaultImg}

const ReviewCard = ({review, isAdmin, shirtId}) => {
    const dispatch = useDispatch();

    function handleDelete (e){
        const idReview = parseInt(e.target.value)
        dispatch(deleteReview(idReview))  
        dispatch(getShirtReview(shirtId));  
    }

    return (
        <div style={{border: "2px solid purple"}}>
            <div>
                <img
                    src={review.image || defaultImg}
                    width={"40px"}
                    height={"40px"}  
                    alt="Customer Feedback"
                />
            </div>
            <div>
                <h3 >{review.name}</h3>
                <p >{review.content}</p>
            </div>
            <div>
                {isAdmin && <button onClick={handleDelete} value={review.id} >x</button>}
            </div>
        </div>
        
    )
}

export default ReviewCard;