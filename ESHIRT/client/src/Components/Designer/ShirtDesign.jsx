import React, {useEffect, useState, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';
import Design from './Design';
import PrintCSS from './ShirtDesign.module.css';



function ShirtDesign(props) {

        const [data, setData] = useState(null);
        const finalCanvas = useRef(null);
        useEffect(()=> {
                        let imgBlob = new Image(340, 420);
                        imgBlob.src = img;

                         console.log(imgBlob);

                
        let canvas = new fabric.StaticCanvas('canvas', {
                        
                        width: 350,
                        height: 410,
                        backgroundColor: props.phase.colorSelected.data,
                        preserveObjectStacking: true,
        
        })
          .add(new fabric.Image(imgBlob, {
                        scaleX: 0.8,
                        scaleY: 0.7,
                        
                        width: 492,
                        height: 585,
                        left: -38,
                        selectable: false,
                        objectCaching: false,
                        
                    }))

                    if(data!==null) {
                        /* return convertToHTMLElement(data, canvas) */
                        const inputImage = new fabric.Image(data, {

                                
                                left: 86,
                                top: 120,
                                    
                        }).scale(1);
                        
                        
                        inputImage.scaleToWidth(data.width/data.height > 1.5 ? 100 : data.width/data.height <= 1.15 ? 170 : 121, true).scaleToHeight(data.width/data.height > 1.5 ? 100: data.width/data.height <= 1.15 ? 170 : 121, true)
                        console.log(data.width, data.height);
                        canvas.add(inputImage);

                    }
        
        
                setTimeout(() => canvas.renderAll(), 222);
        })

        /* useEffect(()=> {
                if(data !== null && typeof data !== 'string') {
                        const conversion = async () => {
                                const fileConverted = await convertBase64(data);
                                props.setPhase({status: true, data: fileConverted});
                                return;
                        }

                        conversion();
                }
        }, [data]) */

    /*     const convertToHTMLElement = async (file)=> {
                
                const reader = new FileReader();

                reader.onload = function(e)  {

                        const imgUploaded = new Image();
                        imgUploaded.src = e.target.result;
                        setData(imgUploaded);
                }

                     reader.readAsDataURL(file);
                     

                     
        }

        const setPhotoHandler = async (e) => {

                
                try {
                        const HTMLImage = await convertToHTMLElement(e.target.files[0])
                        
                        console.log(HTMLImage);
                        

                } catch(err) {
                        console.log(err);
                }
                return;
                
        } */

        
                
        /* console.log(data.src); */
            

    return (
                <div className={PrintCSS.container}>
                        <canvas id="canvas" ref={finalCanvas}/>
                                        <form onSubmit={(e)=> {
                                                e.preventDefault();
                                                
                                                
                                                const finalImage = finalCanvas.current.toDataURL();

                                                props.setPhase({...props.phase, designSelected: {status: true, data: finalImage}, allGoodForSubmit: true,})
                                        }}>
                                                <input type="file" onChange={setPhotoHandler}/>
                                                <input type="submit" disabled={data == null} value={"Añadir foto"} />
                                        </form>
                </div>)
}

export default ShirtDesign;