import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';

function ShirtModel(props) {

    const [data, setData] = useState(null);

    const shirtRef = useRef(null);
    const imageRef = useRef(null);
    
    useEffect(()=>{

        let imgBlob = new Image(340, 420);
        imgBlob.src = img;
        
        console.log(imgBlob);

        /* let canvas = new fabric.Canvas('canvas', {
            height: 550,
            width: 580,
            backgroundColor: 'rgb(0, 0, 0, 0.2)',
        }) */

        

        
            let canvas = new fabric.Canvas('canvas', {
                
                width: 350,
                height: 410,
                backgroundColor: 'rgb(255, 255, 255, 0.4)',
                preserveObjectStacking: true,

            })
            .on('selection:created', (e) => {

                e.target.lockScalingX = true;
                 e.target.height = 80; })

            .add(new fabric.Image(imgBlob, {
                scaleX: 0.8,
                scaleY: 0.7,
                
                width: 492,
                height: 585,
                left: -38,
                selectable: false,
                objectCaching: false,
                
            }));


        setTimeout(() => canvas.renderAll(), 10);
        

    }, [])

    return (
        <div style={{
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    flexDirection: 'column-reverse', 
                    width: 'max-content',
                    margin: '0 auto'}}>
            
            <canvas ref={shirtRef} id="canvas"/>
            <div style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '5%'}}>

            <button style={{backgroundColor: 'yellow', 
                            width: '30%'}} 

                    onClick={()=> {

                let imgTwo = new Image();
                /* let reader = new FileReader(); */
                
                /* reader.onloadend = function() {
                    var base64data = reader.result;                
                    console.log(base64data);
                } */
                imgTwo.src = shirtRef.current.toDataURL();
                console.log(imgTwo);
                setData('yellow')
                shirtRef.current.style.backgroundColor = 'yellow'
                /* imageRef.current.appendChild = img; */

                /* imageRef.current.firstChild = img; */
                
                /*fetch(img.src).then(console.log).then(res=>reader.readAsDataURL(res))
                 */
                return;
            }}>AM</button>
            <button style={{backgroundColor: 'red', width: '30%'}} onClick={() => {
                shirtRef.current.style.backgroundColor = 'red'
                setData('red')
                return;
            }}>
                R
            </button>
            <button 
                style={{backgroundColor: 'rgb(12, 155, 255, 0.6)', width: '30%'}} 
                onClick={() => {
                    shirtRef.current.style.backgroundColor = 'rgb(12, 155, 255, 0.6)'
                    setData('lightblue')
                    return;
            }}>
                CEL
            </button>
            </div>
            <button onClick={()=> {
                if(data !== null) {
                        props.setPhase({
                            colorSelected: {status: true, data}
                            })
            }}} disabled={data===null}>
                Seleccionado? Estampar!
            </button>
        </div>
    )
}

export default ShirtModel;