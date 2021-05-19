import React from "react";
import style from "./Reviews.module.css";
import { getShirtReview } from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Reviews(props) {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.shirtReducer.shirtId);
  
  let id = props.match.params.id;

  console.log(review);

  useEffect(() => {
    dispatch(getShirtReview(id));
  }, []);

  return (
    <div className={style.customer_feedback}>
      <div className={style.container - style.text_center}>
        <div className={style.row}>
          <div className={style.col_sm_offset_2 - style.col_sm_8}>
            <div>
              <h2 className={style.section_title}>What Clients Say</h2>
            </div>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.col_md_offset_3 - style.col_md_6 - style.col_sm_offset_2 - style.col_sm_8}>
            <div className={style.owl_carousel}>
              <div className={style.feedback_slider_item}>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/451270/profile/profile-80.jpg"
                  className="center-block img-circle"
                  alt="Customer Feedback"
                />
                <h3 className={style.customer_name}>User:</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. It is a long established fact that a
                  reader will be distracted by the readable its layout.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
