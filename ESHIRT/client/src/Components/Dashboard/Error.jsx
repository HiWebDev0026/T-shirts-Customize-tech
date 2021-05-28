import React from "react";
import Style from './Error.module.css';

function Error(){

  return (

    <div className={Style.container}>   
    <div className={Style.box}>
      <h1>We're sorry, your account has been deleted</h1>
      <h3>If you think this is a mistake, send an email to admin@gmail</h3>
    </div>
  </div>
  )
};

export default Error;