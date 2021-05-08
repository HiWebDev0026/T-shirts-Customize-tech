import React,{useEffect} from 'react';


function ShirtModel(props) {

    /* REDUX, LAS IMAGENES VIENEN DEL BACK ¿? */

   useEffect(()=> {


        return () => props.setPhase({modelSelected: true})
   }, [])

    return (
        <div>
            'Modelo' (cuello-v, sin manga, etc)

                <button onClick={()=> props.setPhase({modelSelected: true, sizeSelected: false})}>

                    {!props.phase.modelSelected ? 'Seleccionar Modelo' : 'Seleccionar otro modelo?'}
                </button>

        </div>
    )
}

export default ShirtModel;