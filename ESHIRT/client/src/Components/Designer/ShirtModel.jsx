import React,{useEffect, useState} from 'react';
import ModelCSS from './ShirtModel.module.css';


function ShirtModel(props) {

    /* REDUX, LAS IMAGENES VIENEN DEL BACK ¿? */

    const [data, setData] = useState(null);

  /*  useEffect(()=> {


        return () => props.setPhase({modelSelected: {...props.phase.modelSelected, status: true}})
   }, []) */

    return (
        <div className={ModelCSS.container}>
            <div className={ModelCSS.title}>
                <h3>Choose the model of your shirt</h3>
            <form onSubmit={(e)=> {
                e.preventDefault();
                if(data!== null) {
                    props.setPhase({
                        modelSelected: {data, status: true}, 
                        sizeSelected: {...props.phase.sizeSelected, status:false}})}}}>

                <select onChange={(e)=> {
                    setData(e.target.value);
                }}>
                    <option value="Cuello V">V-neck</option>
                    <option value="Manga corta">T-shirt</option>
                    <option value="Sin manga">Long sleeves</option>
                    <option value="Deportiva">Sport</option>
                </select>
                <input type="submit" disabled={data===null} value={data == null ? 'Select model' : 'Next'}/>
            </form>
            </div>

        </div>
    )
}

export default ShirtModel;