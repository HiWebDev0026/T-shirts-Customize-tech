import React, {useState, useEffect} from 'react';
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


    const phaseSetter = (args) => {
        setPhase(prevPhase => {
            return {
                ...prevPhase,
                ...args
            }
        })
    }

    return (
        <div style={{
            minHeight: '90vh', 
            height: '100vh',
            display: 'flex', 
            flexDirection: 'column'}}>
            <PhaseController 
                phase={phase} 
                setPhase={phaseSetter} />
                        
                        {!phase.modelSelected && <ShirtModel phase={phase} setPhase={phaseSetter}/>}
                        {!phase.sizeSelected && <ShirtSize phase={phase} setPhase={phaseSetter}/>}
                        {!phase.colorSelected && <ShirtColor phase={phase} setPhase={phaseSetter}/>}
                        {!phase.designSelected && <ShirtDesign phase={phase} setPhase={phaseSetter}/>}
        </div>
    )
}

export default Design;