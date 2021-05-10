import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';
import ColorCSS from './ShirtColor.module.css';
import ColorBattery from './ColorBattery.jsx';

function ShirtModel(props) {

    const [data, setData] = useState(null);

    const shirtRef = useRef(null);
    const imageRef = useRef(null);

    /* let imgBlob = new Image(340, 420);
        imgBlob.src = img; */
    
    useEffect(()=>{

        let imgBlob = new Image(340, 420);
        imgBlob.src = img;
        
        console.log(imgBlob);
        
            let canvas = new fabric.StaticCanvas('canvas', {
                
                    width: 350,
                    height: 410,
                    backgroundColor: data,
                    selectable: false,
                    preserveObjectStacking: true,
                    lockMovementY: true,
                    lockMovementX: true,
                    

            })
                 .add(new fabric.Rect({
                    width: 350,
                    height: 410,
                    fill: props.phase.colorSelected.data,
                    lockMovementY: true,
                    lockMovementX: true,
                    selectable: false,
                    
                }))
                .add(new fabric.Image(imgBlob, {
                    scaleX: 0.8,
                    scaleY: 0.7,
                    evented: false,
                    lockMovementY: true,
                    lockMovementX: true,
                    width: 492,
                    height: 585,
                    left: -38,
                    selectable: false,
                    
                }));


        setTimeout(() => canvas.renderAll(), 222);
        

    }, [props.phase.colorSelected.data])

    return (
        <div className={ColorCSS.container}>
            
            <canvas ref={shirtRef} id="canvas"/>
            <div ref={imageRef}></div>
            <ColorBattery props={{
                                setData: (arg)=> setData(arg), 
                                setPhase: (arg)=> props.setPhase(arg)}} />
                    <form onSubmit={(e)=> {
                        e.preventDefault();
                        if(data !== null) {
                                props.setPhase({
                                        colorSelected: {status: true, data},
                                        designSelected: {...props.phase.designSelected, status: false}
                                    })
                    }}}>
                    <input 
                            type="submit" 
                            disabled={data===null} />
                        Elegí el color
                    
                    </form>
        </div>
    )
}

export default ShirtModel;