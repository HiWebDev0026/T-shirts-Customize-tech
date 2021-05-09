import React, {useEffect} from 'react';
import ControllerCSS from './Controller.module.css';


function PhaseController(props) {





    const phases = [
                    {index: 1, name: 'Modelo', phase: 'modelSelected'}, 
                    {index: 2, name: 'Talle', phase: 'sizeSelected'},
                    {index: 3, name: 'Color', phase: 'colorSelected'},
                    {index: 4, name: 'Diseño', phase: 'designSelected'}
                    ]


    return (
        <div className={ControllerCSS.controllerContainer}>

            {phases.map((elem,index) => {

                return (
                    <div 
                        key={index}
                        className={ControllerCSS.buttonsContainer}
                        >
                                            <button className={props.phase[elem.phase].status ? ControllerCSS.buttons : ControllerCSS.selectedButtons}
                                                    onClick={()=> {props.setPhase({
                                                                                    modelSelected: {...props.phase.modelSelected, status: props.phase.modelSelected.status == 'pending' ? 'pending' : true},
                                                                                    sizeSelected: {...props.phase.sizeSelected, status: props.phase.sizeSelected.status == 'pending' ? 'pending' : true},
                                                                                    colorSelected: {...props.phase.colorSelected, status: props.phase.colorSelected.status == 'pending' ? 'pending' : true},
                                                                                    designSelected: {...props.phase.designSelected,status: props.phase.designSelected.status =='pending' ? 'pending' : true},
                                                                                    allGoodForSubmit: false,
                                                                                    [elem.phase]: {...props.phase[elem.phase], status: false}
                                                                                      }
                                                                                );
                                                                    
                                                                    }}
                                                    disabled={props.phase[elem.phase].status == 'pending'}
                                                    value={elem.phase}>
                                                                    {elem.index}
                                                </button>
                                                <div className={props.phase[elem.phase].status ? ControllerCSS.btnDescription : ControllerCSS.btnSelected}>

                        <h4>{elem.name}</h4>
                        </div>
                    </div>
                )
            })} 
        </div>
    )
}


export default PhaseController;