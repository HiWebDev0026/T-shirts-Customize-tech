import React from 'react';


function PhaseController(props) {



    return (
        <div style={{display: 'flex', border: '1px solid black', flexWrap: 'wrap',width: '100%', height: '30%',justifyContent: 'space-around'}}>
            {[
            
            {index: 1, name: 'Modelo', phase: 'modelSelected'}, 
            {index: 2, name: 'Talle', phase: 'sizeSelected'},
            {index: 3, name: 'Color', phase: 'colorSelected'},
            {index: 4, name: 'Diseño', phase: 'designSelected'}].map((elem,index) => {

                return (
                    <div 
                        key={index}
                        style={{minHeight: '90%', 
                                border: '1px solid black', 
                                textAlign: 'center', 
                                width: '20%', 
                                minWidth: '6em'}}>
                                            <button onClick={()=> props.setPhase({[elem.phase]: false})}
                                                    disabled={props.phase[elem.phase] == 'pending'}>
                                                                    {elem.name}
                                                </button>
                        {elem.index}
                    </div>
                )
            })} 
        </div>
    )
}


export default PhaseController;