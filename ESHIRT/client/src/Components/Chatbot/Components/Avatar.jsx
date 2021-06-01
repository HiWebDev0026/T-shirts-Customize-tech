import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import botImg from '../../../Images/chatbot2.png';
import defaultImg from '../../../Images/no_user_image.png'

const displayImage = (imgToDisplay, isUser) => {
  return (
    <img 
      src={imgToDisplay || defaultImg} 
      width={isUser ? "45px" : "50px"} 
      height={"45px"}
      style={
        isUser ? 
          {borderRadius: "100%", backgroundColor: "gold"} : 
          {borderRadius: "100%", backgroundColor: "#ffb627"}
        }
    ></img>
  )
}

function Avatar({isUser}) {
  const {isAuthenticated, user} = useAuth0()
  return (
    <div>
        {isUser ? displayImage((isAuthenticated && user.picture), true) : displayImage(botImg, false)}
    </div>
  );
}
  
export default Avatar;