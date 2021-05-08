import React,{useEffect, useState} from 'react';


function ShirtModel(props) {

    /* REDUX, LAS IMAGENES VIENEN DEL BACK ¿? */

    const [data, setData] = useState(null);

  /*  useEffect(()=> {


        return () => props.setPhase({modelSelected: {...props.phase.modelSelected, status: true}})
   }, []) */

    return (
        <div>
            'Modelo' (cuello-v, sin manga, etc)
            <form onSubmit={()=> {
                        if(data!== null) {
                            props.setPhase({
                            modelSelected: {data, status: true}, 
                            sizeSelected: {...props.phase.sizeSelected, status:false}})}}}>

                <select onChange={(e)=> {
                    setData(e.target.value);
                }}>
                    <option value="Cuello V">Cuello V</option>
                    <option value="Manga corta">Manga corta</option>
                    <option value="Sin manga">Sin manga</option>
                    <option value="Deportiva">Deportiva</option>
                </select>
                <input type="submit" disabled={data===null} value={data == null ? 'Seleccionar Modelo' : 'Continuar'}/>
            </form>

        </div>
    )
}

export default ShirtModel;