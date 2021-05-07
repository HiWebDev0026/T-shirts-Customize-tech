import React from 'react';
/* import NavBar from '../NavBar/NavBar'; */
import StandardShirts from './StandardShirts';
import ShirtModel from './ShirtModel';

function Design(props) {

    return (
        <div style={{minHeight: '90vh', height: '100vh',display: 'flex', flexDirection: 'column'}}>
            <StandardShirts />
            <ShirtModel />
        </div>
    )
}

export default Design;