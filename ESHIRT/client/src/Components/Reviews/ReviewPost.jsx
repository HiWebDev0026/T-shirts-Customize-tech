import React from "react";
import style from "./Reviews.module.css";
import { postShirtReview } from "../../Actions/index.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

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
            alert('choose at least 1 star')
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
        <div >
            <div className={style.row}>
            <div className={style.col_sm_offset_2 - style.col_sm_8}>
                <div>
                <h2 className={style.section_title}>What Clients Say</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="container_12">
                <p>
                <textarea
                    className="b3"
                    name="steps"
                    rows="10"
                    cols="50"
                    onChange={handleChange}
                    required
                ></textarea>
                </p>
                <div>
                <p class={style.clasificacion}  onChange={handleChangeStart} >
                    <input id="radio1"  type="radio" name="star" value="5"  className={style.star} style={{display:'none'}} />
                    <label for="radio1">★</label>
                    <input id="radio2" type="radio" name="star" value="4" className={style.star}style={{display:'none'}}/>
                    <label for="radio2">★</label>
                    <input id="radio3" type="radio" name="star" value="3"className={style.star}style={{display:'none'}}/>
                    <label for="radio3">★</label>
                    <input id="radio4" type="radio" name="star" value="2"className={style.star}style={{display:'none'}}/>
                    <label for="radio4">★</label>
                    <input id="radio5" type="radio" name="star" value="1" className={style.star}style={{display:'none'}}/>
                    <label for="radio5">★</label>
                </p>
                    </div>
                <input type="submit" value="SUBMIT" />
            
            </form>
        
            </div>

        </div>
    ) 
}

export default ReviewPost;