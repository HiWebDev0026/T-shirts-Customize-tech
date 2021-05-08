import React, {useState, useEffect} from 'react';
import axios from 'axios';
/* import NavBar from '../NavBar/NavBar'; */
import PhaseController from './PhaseController';
import ShirtColor from './ShirtColor';
import ShirtModel from './ShirtModel'
import ShirtSize from './ShirtSize';
import ShirtDesign from './ShirtDesign';


function Design(props) {

    const [phase, setPhase] = useState({
                                modelSelected: {status: false, data: ''},
                                sizeSelected: {status: 'pending', data: ''},
                                colorSelected: {status: 'pending', data: ''},
                                designSelected: {status: 'pending', data: ''},
                                allGoodForSubmit: false,
                            });



    useEffect(()=> {

    }, [phase.designSelected.status])

    const phaseSetter = (args) => {
        setPhase(prevPhase => {
            return {
                ...prevPhase,
                ...args
            }
        })
    }

    const submitToDB = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: 'http://localhost:3000/postShirt',
            data: {
                name: 'test',
                print: phase.designSelected.data,
                size: phase.sizeSelected.data,
                model: phase.modelSelected.model,
                

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
                        
                        {!phase.modelSelected.status && <ShirtModel phase={phase} setPhase={phaseSetter}/>}
                        {!phase.sizeSelected.status && <ShirtSize phase={phase} setPhase={phaseSetter}/>}
                        {!phase.colorSelected.status && <ShirtColor phase={phase} setPhase={phaseSetter}/>}
                        {!phase.designSelected.status && <ShirtDesign phase={phase} setPhase={phaseSetter}/>}
                        {phase.allGoodForSubmit && <form onSubmit={(e)=>{
                            e.preventDefault();

                        }}>

                                    <input type="submit" />
                            </form>}
        </div>
    )
}

export default Design;