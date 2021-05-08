import React, {useEffect} from 'react';


function PhaseController(props) {





    const phases = [
                    {index: 1, name: 'Modelo', phase: 'modelSelected'}, 
                    {index: 2, name: 'Talle', phase: 'sizeSelected'},
                    {index: 3, name: 'Color', phase: 'colorSelected'},
                    {index: 4, name: 'Diseño', phase: 'designSelected'}
                    ]


    return (
        <div style={{

            display: 'flex', 
            border: '1px solid white', 
            flexWrap: 'wrap',
            width: '65%',
            margin: '0 auto',
            height: '12%',
            justifyContent: 'space-around'}}>
            {phases.map((elem,index) => {

                return (
                    <div 
                        key={index}
                        style={{height: '60%', 
                                border: '1px solid white',
                                borderRadius: '50%',
                                textAlign: 'center', 
                                width: 'max-content', 
                                minWidth: '6em'}}>
                                            <button onClick={()=> {props.setPhase({
                                                                                    modelSelected: props.phase.modelSelected == 'pending' ? 'pending' : true,
                                                                                    sizeSelected: props.phase.sizeSelected == 'pending' ? 'pending' : true,
                                                                                    colorSelected: props.phase.colorSelected == 'pending' ? 'pending' : true,
                                                                                    designSelected: props.phase.designSelected == 'pending' ? 'pending' : true,
                                                                                    [elem.phase]: false
                                                                                      }
                                                                                );
                                                                    
                                                                    }}
                                                    disabled={props.phase[elem.phase] == 'pending'}
                                                    value={elem.phase}>
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