import React from 'react';
import {useDispatch} from 'react-redux';
import FinalCSS from './FinalShirt.module.css';
import img from '../../assets/img/random_remera_front.png';
import {fabric} from 'fabric';
import { postShirt } from '../../Actions/index.js';
export default function FinalShirt(props) {

    const {phase} = props;
    const dispatch= useDispatch();

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