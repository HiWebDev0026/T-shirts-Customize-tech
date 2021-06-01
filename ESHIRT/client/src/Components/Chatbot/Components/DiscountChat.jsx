import React, {useEffect, useState}from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import LinkMessage from './LinkMessage';


function DiscountChat(props) {

    const history = useHistory();
    const shirts = useSelector((state) => state.shirtReducer.allShirts);
    const shirtWithDiscount = shirts.filter(shirt=>shirt.latestPrice > 0);

    return (
      <div>
        {shirtWithDiscount > 0?
          <div>
            <h3>We have this shirts on discount, check them out!</h3>
          {shirtWithDiscount.map(shirt=>
            <LinkMessage address={'/catalogue'} message={shirt.name} />
          )}
          </div>
          : <h3>We don't have shirts on discount right now, but we will soon</h3>
        }
      </div>
    );
}

export default DiscountChat;