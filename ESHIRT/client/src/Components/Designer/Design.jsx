import React, {useState} from 'react';
/* import NavBar from '../NavBar/NavBar'; */
import PhaseController from './PhaseController';
import ShirtColor from './ShirtColor';
import ShirtModel from './ShirtModel'
import ShirtSize from './ShirtSize';
import ShirtDesign from './ShirtDesign';

function Design(props) {
    const [phase, setPhase] = useState({
        modelSelected: false,
        sizeSelected: 'pending',
        colorSelected: 'pending',
        designSelected: 'pending',
    });

    return (
        <div style={{
            minHeight: '90vh', 
            height: '100vh',
            display: 'flex', 
            flexDirection: 'column'}}>
            <PhaseController 
                phase={phase} 
                setPhase={(args)=> 
                    setPhase(prevPhase => {
                                        return {
                                            ...prevPhase,
                                            ...args
                        }
                    })} />
                        
                        {!phase.modelSelected && <ShirtModel />}
                        {!phase.sizeSelected && <ShirtSize />}
                        {!phase.colorSelected && <ShirtColor />}
                        {!phase.designSelected && <ShirtDesign />}
        </div>
    )
}

export default Design;