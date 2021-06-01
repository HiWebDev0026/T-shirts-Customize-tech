import React from 'react';
import {Link} from 'react-router-dom';
import Style from '../ChatbotSelect.module.css'

function LinkMessage({address, message}) {
    return (
      <div >
            <Link to={address}>
                <h5 style={{
                    color: 'black', 
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    padding: '10px',
                    border: '2px solid #ffb627',
                    
                }}
                className={Style.robotoFamily}
                >
                    {message}
                </h5>
            </Link>
      </div>
    );
}

export default LinkMessage;