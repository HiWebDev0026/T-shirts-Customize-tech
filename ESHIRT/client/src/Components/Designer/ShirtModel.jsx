import React,{useEffect, useState} from 'react';
import ModelCSS from './ShirtModel.module.css';
import img from '../../assets/manga_larga.png';
import img2 from '../../assets/img/random_remera_front.png';
import img3 from '../../assets/img/women_Vshirt.png';
import swal from 'sweetalert';

function ShirtModel(props) {

    /* REDUX, LAS IMAGENES VIENEN DEL BACK ¿? */

    const [data, setData] = useState(null);

   useEffect(()=> {

    if(data!== null){
                    swal({
                        title: data,
                        icon: 'success',
                        text: 'The model '+ data + ' has been selected. You can now choose your preferred size.',
                        buttons: ['Choose another model', 'CHOOSE SIZE']
                    }).then((allow)=> {
                        if(data!== null && allow) {
                            return props.setPhase({
                                modelSelected: {data, status: true}, 
                                sizeSelected: {...props.phase.sizeSelected, status:false}})
                       }
                    })
                }
   }, [data])

    return (
        <div className={ModelCSS.containerOfDesign}>
            <div className={ModelCSS.title}>
                <h4>{!data && !props.phase.modelSelected.data ? 'Choose the model of your shirt' : !data ? props.phase.modelSelected.data : data}</h4>
                {/* <span>{data && <button className={ModelCSS.GoAhead}onClick={()=>{
                    if(data!== null) {
                        return props.setPhase({
                            modelSelected: {data, status: true}, 
                            sizeSelected: {...props.phase.sizeSelected, status:false}})
                   }
                }}>{'CONTINUE >>'}</button>}</span> */}
                </div>
            <div className={ModelCSS.AvailableShirts} >

                <div className={ModelCSS.ShirtAvatar} style={props.phase.modelSelected.data === 'Long sleeve' ? {backgroundColor: 'gray'} : {backgroundColor: 'none'}} onClick={()=> {
                    
                    return setData(prevState => prevState = 'Long sleeve');
                    
                    }}>
                    <img src={img}></img>
                </div>
                <div className={ModelCSS.ShirtAvatar} style={props.phase.modelSelected.data === 'T-Shirt' ? {backgroundColor: 'gray'} : {backgroundColor: 'none'}} onClick={()=> {
                    return setData(prevState => prevState = 'T-Shirt');
                }}>
                    <img src={img2}></img>
                </div>
            </div>
            {/* <form onSubmit={(e)=> {
                e.preventDefault();
                if(data!== null) {
                    props.setPhase({
                        modelSelected: {data, status: true}, 
                        sizeSelected: {...props.phase.sizeSelected, status:false}})}}}>

                <select onChange={(e)=> {
                    setData(e.target.value);
                }}>
                    <option value="">Select</option>
                    <option value="Manga corta">T-shirt</option>
                    <option value="Long sleeve">Long sleeve</option>
                </select>
                <input type="submit" disabled={data===null} value={data == null ? 'Select model' : 'Next'}/>
            </form> */}
            </div>

        
    )
}

export default ShirtModel;