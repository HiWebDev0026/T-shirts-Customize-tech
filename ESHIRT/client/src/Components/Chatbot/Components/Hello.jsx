import React from 'react';
import LinkMessage from './LinkMessage';

function Hello(props) {
    return (
      <LinkMessage address={'/catalogue'} message={'click here to check our shirts!'}/>
    );
}

export default Hello;