import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import FinalCSS from './FinalShirt.module.css';
// import submitToDB from './helpers/dbHandler';
import img from '../../assets/img/random_remera_front.png';
import {fabric} from 'fabric';
import { postShirt } from '../../Actions/index.js';
export default function FinalShirt(props) {


    

    const {phase} = props;
  
    const shirts= useSelector((state)=>state.allShirts)
    const dispatch= useDispatch();

    const [shirt,setShirt]= useState('');

    // const [input, setInput] = useState({
    //     userId: '',
    //     name: '',
    //     print: '',
    //     size: '',
    //     color: '',
    //     model: '',
    // });
    // function handleChange(e) {
    //     const value = e.target.value;
    //     const name = e.target.name
    //     setInput({
    //         ...input,
    //         [name]: value
    //     });
    // }


    function handleSubmit (e, phase) {
        e.preventDefault();
        dispatch(postShirt( 
            {
            userId: 1,
            name: 'kjnjhgffhjkiyz',
            print: phase.designSelected.data,
            size: phase.sizeSelected.data,
            color: phase.colorSelected.data,
            public: true,
            model: phase.modelSelected.data,
    }));}

    return (
        <div className={FinalCSS.container}>
            <div className={FinalCSS.finalShirt}>
                {/* <canvas id="canvas" /> */}
                <img src={props.phase.designSelected.data}/>
            </div>
            <div className={FinalCSS.submitContainer}>
                <div className={FinalCSS.uploadText}>
                    <h3>Do you like your shirt? Upload your design!</h3>
                </div>
                <div className={FinalCSS.uploadForm}>
                    <form onSubmit={(e)=> handleSubmit(e, phase)}>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>

    )
}