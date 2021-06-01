import React from 'react';
import LinkMessage from './LinkMessage';

function Shirts(props) {
    return (
      <div>
          <LinkMessage address={'/catalogue'} message={'click here to check our shirts!'}/>
          <LinkMessage address={'/design'} message={'click here to create a new design!'}/>
      </div>
    );
}

export default Shirts;