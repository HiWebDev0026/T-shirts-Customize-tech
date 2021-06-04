import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/manga_larga.png';
import img2 from '../../assets/img/random_remera_front.png';
import img3 from '../../assets/img/women_Vshirt.png';
import ColorCSS from './ShirtColor.module.css';
import ColorBattery from './ColorBattery.jsx';

function ShirtModel(props) {

    const [data, setData] = useState(null);

    const shirtRef = useRef(null);
    const imageRef = useRef(null);

    /* let imgBlob = new Image(340, 420);
        imgBlob.src = img; */
    
    const handleInput = (e) => {
        e.preventDefault();
        if(data !== null) {
            props.setPhase({
                    colorSelected: {status: true, data},
                    designSelected: {...props.phase.designSelected, status: false}
                })
        }

    }

    useEffect(()=>{

        let imgBlob = new Image(340, 420);
        imgBlob.src = props.phase.modelSelected.data !== 'Long sleeve' && props.phase.modelSelected.data !== 'Cuello V' ? img2 : props.phase.modelSelected.data !== 'T-Shirt' && props.phase.modelSelected.data !== 'Long sleeve' ? img3 : img;
                
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
                    scaleX: props.phase.modelSelected.data === 'Long sleeve' ?  0.57 : 0.8,
                    scaleY: props.phase.modelSelected.data === 'Long sleeve' ? 0.5 : 0.7,
                    evented: false,
                    lockMovementY: true,
                    lockMovementX: true,
                    width: props.phase.modelSelected.data === 'Long sleeve' ? 880: 520,
                    height: props.phase.modelSelected.data === 'Long sleeve' ? 860 : 585,
                    left: props.phase.modelSelected.data === 'Long sleeve' ? -72 : -38,
                    selectable: false,
                    
                }));


        setTimeout(() => canvas.renderAll(), 222);
        

    }, [props.phase.colorSelected.data])

    return (
        <div className={ColorCSS.container}>
            <div className={ColorCSS.shirtInputContainer}>
            <canvas ref={shirtRef} id="canvas"/>
            <input 
                onClick={handleInput}
                type="submit" 
                disabled={data===null}
                value="Choose color"
                style={{
                    borderRadius: '5px', 
                    padding: '10px 40px 10px 40px', 
                    fontSize: '18px', 
                    fontFamily: 'Roboto Condensed, sans-serif',
                    fontWeight: 900,
                    backgroundColor: data !== null && 'rgb(19, 195, 5)',
                    margin: '30px',
                    color: data !== null && 'white',
                    borderColor: data !== null && 'mediumseagreen'
                }} 
            />
            </div>
            
                <ColorBattery props={{
                    setData: (arg)=> setData(arg), 
                    setPhase: (arg)=> props.setPhase(arg)}} 
                />
                 
        </div>
    )
}

// onSubmit={(e)=> {
//     e.preventDefault();
//     if(data !== null) {
//         props.setPhase({
//                 colorSelected: {status: true, data},
//                 designSelected: {...props.phase.designSelected, status: false}
//             })
//     }}}

export default ShirtModel;