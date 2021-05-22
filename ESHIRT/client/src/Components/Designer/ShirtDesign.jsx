import React, {useEffect, useState, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';
import Design from './Design';
import PrintCSS from './ShirtDesign.module.css';



function ShirtDesign(props) {

        const [data, setData] = useState(null);
        const finalCanvas = useRef(null);

        useEffect(()=> {
                        let imgBlob = new Image();
                        imgBlob.src = img;
                     

                       

                
        let canvas = new fabric.StaticCanvas('canvas', {
                        
                        width: 350,
                        height: 410,
                        backgroundColor: props.phase.colorSelected.data,
                        preserveObjectStacking: true,
                        selection: false,
        
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
                        let MAX_WIDTH = 170;
                        let MAX_HEIGHT = 268;
                        const inputImage = new fabric.Image(data, data.width > data.height && data.width > MAX_WIDTH ? {
                                
                                scaleX: MAX_WIDTH/data.width,
                                scaleY: MAX_HEIGHT/data.height - MAX_WIDTH/data.width,
                             /*    width: MAX_WIDTH,
                                height: data.height*MAX_WIDTH/data.width, */
                                objectCaching: true,
                                visible: true,
                                left: 86,
                                top: 115,
                                    
                        } : data.height > MAX_HEIGHT ? {

                                scaleX: MAX_WIDTH/data.width,
                                scaleY: MAX_HEIGHT/data.height - (MAX_WIDTH/data.width*(MAX_HEIGHT/data.height)),
                                objectCaching: true,
                                visible: true,
                                left: 86,
                                top: 115,
                        } : {
                                width: 140,
                                height: 120,
                                objectCaching: true,
                                visible: true,
                                left: 86,
                                top: 120,

                        })
                        

                
                        
                        
                        
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

        const convertToHTMLElement = async (file)=> {

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
                
        }

        
                
        /* console.log(data.src); */
            

    return (
                <div className={PrintCSS.container}>
                        <canvas id="canvas" ref={finalCanvas}/>
                                        <form className={PrintCSS.columnAux} onSubmit={(e)=> {
                                                e.preventDefault();
                                                
                                                
                                                const finalImage = finalCanvas.current.toDataURL();

                                                props.setPhase({
                                                        ...props.phase, 
                                                        designSelected: {
                                                                status: true, 
                                                                data: finalImage
                                                        }, 
                                                        allGoodForSubmit: true,
                                                })
                                        }}>

                                                
                                                        <label style={{                                        
                                                                border: '3px solid coral', 
                                                                padding: '8px 40px 8px 40px', 
                                                                fontSize: '18px', 
                                                                backgroundColor: 'coral',
                                                                color: 'black',
                                                                borderColor: 'salmon',
                                                                margin: '20px 0px 0px 0px'
                                                        }}>
                                                                Upload Image
                                                        
                                                                <input type="file" style={{display: 'none'}} onChange={setPhotoHandler}/>
                                                        </label>

                                                        <input 
                                                                type="submit" 
                                                                disabled={data === null} 
                                                                value={"Create Shirt"}
                                                                style={{
                                                                        borderRadius: '5px', 
                                                                        padding: '10px 40px 10px 40px', 
                                                                        fontSize: '18px', 
                                                                        backgroundColor: data !== null && 'forestgreen',
                                                                        margin: '130px 0px 0px 0px',
                                                                        color: data !== null && 'white',
                                                                        borderColor: data !== null && 'mediumseagreen'
                                                                }} 
                                                        />
                                                
                                        </form>
                </div>)
}

export default ShirtDesign;