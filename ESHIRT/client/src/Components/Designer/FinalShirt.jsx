import React, {useEffect} from 'react';
import FinalCSS from './FinalShirt.module.css';
import submitToDB from './helpers/dbHandler';
import img from '../../assets/img/random_remera_front.png';
import {fabric} from 'fabric';
export default function FinalShirt(props) {


    const {phase} = props;

   /*  useEffect(()=> {

        let imgBlob = new Image();
        imgBlob.src = img;
        let canvas = new fabric.StaticCanvas('canvas', {

                width: 350,
                height: 410,
                selectable: false,
                preserveObjectStacking: true,
                lockMovementY: true,
                lockMovementX: true,

        }).add(new fabric.Rect({
                width: 350,
                height: 410,
                fill: props.phase.colorSelected.data,
                lockMovementY: true,
                lockMovementX: true,
                selectable: false,
        })).add(new fabric.Image(imgBlob, {
                scaleX: 0.8,
                scaleY: 0.7,
            
                width: 492,
                height: 585,
                left: -38,
                selectable: false,
                objectCaching: false,
            
        }))

        if(props.phase.designSelected.data !== null) {
        
        let print = new fabric.Image(props.phase.designSelected.data, {
                scaleY: 0.9,
                scaleX: 0.2,
                left: 86,
                top: 120,
        }).scaleToWidth(120).scaleToHeight(120)
        canvas.add(print);
    }

    }) */

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
                    <form onSubmit={(e)=> submitToDB(e, phase)}>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>

    )
}