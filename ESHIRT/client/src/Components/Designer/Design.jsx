import React, {useState, useEffect} from 'react';
import axios from 'axios';
/* import NavBar from '../NavBar/NavBar'; */
import PhaseController from './PhaseController';
import ShirtColor from './ShirtColor';
import ShirtModel from './ShirtModel'
import ShirtSize from './ShirtSize';
import ShirtDesign from './ShirtDesign';
import FinalShirt from './FinalShirt';
import DesignCSS from './Design.module.css';



function Design(props) {

    const [phase, setPhase] = useState({
                                modelSelected: {status: false, data: null},
                                sizeSelected: {status: 'pending', data: null},
                                colorSelected: {status: 'pending', data: 'white'},
                                designSelected: {status: 'pending', data: null},
                                allGoodForSubmit: false,
                            });



    useEffect(()=> {
        
   /*  console.log('useeffect'); */
        for(let prop in phase) {
            if(phase[prop].status == false) {
                return setPhase(prevPhase => {
                    return {...prevPhase, allGoodForSubmit: false,}})
            }
        }
    

        setPhase(prevPhase => {
            return {...prevPhase, allGoodForSubmit: true,}})

    }, [])

    const phaseSetter = (args) => {
        setPhase(prevPhase => {
            return {
                ...prevPhase,
                ...args
            }
        })
    }

    
    console.log('i render');

    return (
        <div className={DesignCSS.mainContainer}>
            <PhaseController 
                phase={phase} 
                setPhase={phaseSetter} />
                        
                        {!phase.modelSelected.status && <ShirtModel phase={phase} setPhase={phaseSetter}/>}
                        {!phase.sizeSelected.status && <ShirtSize phase={phase} setPhase={phaseSetter}/>}
                        {!phase.colorSelected.status && <ShirtColor phase={phase} setPhase={phaseSetter}/>}
                        {!phase.designSelected.status && <ShirtDesign phase={phase} setPhase={phaseSetter}/>}
                        {phase.allGoodForSubmit && <FinalShirt phase={phase} setPhase={phaseSetter}/>}
        </div>
    )
}

export default Design;