import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';

import ColorBattery from './ColorBattery.jsx';

function ShirtModel(props) {

    const [data, setData] = useState(null);

    const shirtRef = useRef(null);
    const imageRef = useRef(null);

    let imgBlob = new Image(340, 420);
        imgBlob.src = img;
    
    useEffect(()=>{

        let imgBlob = new Image(340, 420);
        imgBlob.src = img;
        
        console.log(imgBlob);
        
            let canvas = new fabric.Canvas('canvas', {
                
                width: 350,
                height: 410,
                backgroundColor: data,
                preserveObjectStacking: true,

            })
            .on('selection:created', (e) => {

                e.target.lockScalingX = true;
                 e.target.height = 80; })

                 .add(new fabric.Rect({
                    width: 350,
                    height: 410,
                    fill: props.phase.colorSelected.data,
                    selectable: false,
                })).add(new fabric.Image(imgBlob, {
                    scaleX: 0.8,
                    scaleY: 0.7,
                
                    width: 492,
                    height: 585,
                    left: -38,
                    selectable: false,
                    objectCaching: false,
                }));


        setTimeout(() => canvas.renderAll(), 222);
        

    }, [props.phase.colorSelected.data])

    return (
        <div style={{
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    flexDirection: 'column-reverse', 
                    width: 'max-content',
                    margin: '0 auto'}}>
            
            <canvas ref={shirtRef} id="canvas"/>
            <div ref={imageRef}></div>
            <ColorBattery props={{setData: (arg)=> setData(arg), setPhase: (arg)=> props.setPhase(arg)}} />
            <form onSubmit={(e)=> {
                e.preventDefault();
                if(data !== null) {
                        props.setPhase({
                                colorSelected: {status: true, data},
                                designSelected: {...props.phase.designSelected, status: false}
                            })
            }}}>
            <input type="submit" disabled={data===null} />
                Elegí el color
            
            </form>
        </div>
    )
}

export default ShirtModel;