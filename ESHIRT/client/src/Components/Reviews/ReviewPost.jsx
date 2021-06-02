import React from "react";
import Style from "./Reviews.module.css";
import { postShirtReview } from "../../Actions/index.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from 'sweetalert';


const ReviewPost = ({shirtId, userData, isAuthenticated}) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        content: "",
        name: "",
        image: "",
        scoreReview: 0
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (parseInt(input.scoreReview) < 1){
            swal({ 
                title: "Score Submit", 
                text: "Choose at least 1 star",
                icon: "warning",
                timer: 3000,
                padding: "0.75rem"
            });
        } 
        if (!isAuthenticated){
            alert("you must be signed up to post a review");
        }
        if (isAuthenticated && parseInt(input.scoreReview ) > 0 ) {
            dispatch(postShirtReview(input, shirtId, userData.sub.split("|")[1]));
            setInput({
                content: "",
                name: "",
                image: "",
                scoreReview: 0
            })

        }     
    }
    function handleChange(e) {
        const content = e.target.value;
        const name = userData.name;
        const image = userData.picture;
        setInput({
            ...input,
            content,
            name,
            image,
        });
    }

    function handleChangeStart(e) {
        const scoreReview = parseInt(e.target.value);
        setInput({
          ...input,
          scoreReview
        })
    }
    
    return(
        
        <div className={Style.formContainer}>
            <h2 className={Style.robotoFamily}>What Clients Say</h2>
            <form onSubmit={handleSubmit} className={Style.reviewsForm}>
                <p >
                    <textarea
                        className={Style.postTxtArea}
                        name="steps"
                        rows="10"
                        cols="50"
                        onChange={handleChange}
                        required
                    ></textarea>
                </p>
                <div>
                    <span  onChange={handleChangeStart}  className={Style.starsDirection}>
                        <input id="radio1"  type="radio" name="star" value="5" style={{display:'none'}} />
                        <label for="radio1" style={{fontSize: "28px"}}>★</label>
                        <input id="radio2" type="radio" name="star" value="4" style={{display:'none'}}/>
                        <label for="radio2">★</label>
                        <input id="radio3" type="radio" name="star" value="3" style={{display:'none'}}/>
                        <label for="radio3">★</label>
                        <input id="radio4" type="radio" name="star" value="2" style={{display:'none'}}/>
                        <label for="radio4">★</label>
                        <input id="radio5" type="radio" name="star" value="1" style={{display:'none'}}/>
                        <label for="radio5">★</label>
                    </span>
                </div>
                <input type="submit" value="SUBMIT" className={Style.submitButton}/>
            </form>
        </div>
        
    ) 
}

export default ReviewPost;