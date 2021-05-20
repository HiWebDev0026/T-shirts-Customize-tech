import React from "react";
import style from "./Reviews.module.css";
import { getShirtReview, postShirtReview } from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAuth0} from "@auth0/auth0-react";

function Reviews(props) {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.reviewsReducer.reviews);
  const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  let id = props.match.params.id;
  let userData = user

  const [input, setInput] = useState({
    content: "",
    
  });



  useEffect(() => {

    dispatch(getShirtReview(id));
  }, []);

  function handleSubmit() {

    if (isAuthenticated) {
      let userId = userData.sub.split('|')[1]
      console.log(userId)
       dispatch(postShirtReview(input, id, userId ));
    }else{
      alert('you must be signed up to post a review')
    }
    
  }
  function handleChange(e) {  
    setInput({
      ...input,
      content: e.target.value
  })}

  return (
    <div className={style.customer_feedback}>
      <div className={style.container - style.text_center}>
        <div className={style.row}>
          <div className={style.col_sm_offset_2 - style.col_sm_8}>
            <div>
              <h2 className={style.section_title}>What Clients Say</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="container_12"> 
          <p> 
          <textarea className="b3" name="steps" rows="10" cols="50"onChange={handleChange} required></textarea>
          </p>
          <input type="submit" value="SUBMIT" className="boton1"/>
          </form>
           
            

        </div>
        {review.length>0?
        review.map(e =>{

        return (
          <div className={style.row}>
            <div
              className={
                style.col_md_offset_3}>
              <div className={style.owl_carousel}>
                <div className={style.feedback_slider_item}>
                  <img
            
                    className="center-block img-circle"
                    alt="Customer Feedback"
                  />
                  <h3 className={style.customer_name}>User</h3>
                  <p>{review[0].content}</p>
                </div>
              </div>
            </div>
          </div>
        )}) :<p className={style.section_title}>No items in review</p>
        }
        <div></div>
      </div>
    </div>
  );
}

export default Reviews;
