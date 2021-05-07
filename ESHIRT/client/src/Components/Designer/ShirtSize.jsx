import React, {useEffect} from 'react';



function ShirtSize(props) {
/* 
    useEffect(()=> {


        return () => props.setPhase({sizeSelected: true,})

    }, []) */

    return (<div>
        'SIZE'

        <button onClick={()=> props.setPhase({sizeSelected: true, colorSelected: false})}>
            {!props.phase.sizeSelected ? 'Seleccionar Tamaño' : 'Seleccionar otro tamaño?'}
        </button>
    </div>)
}

export default ShirtSize;