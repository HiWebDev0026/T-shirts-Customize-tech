import React, {useEffect, useState, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/manga_larga.png';
import img2 from '../../assets/img/random_remera_front.png';
import img3 from '../../assets/img/women_Vshirt.png';
import Design from './Design';
import PrintCSS from './ShirtDesign.module.css';
import swal from 'sweetalert';



function ShirtDesign(props) {

        const [data, setData] = useState(null);
        const finalCanvas = useRef(null);

        useEffect(()=> {
                        let imgBlob = new Image();
                        imgBlob.src = props.phase.modelSelected.data !== 'Long sleeve' && props.phase.modelSelected.data !== 'Cuello V' ? img2 : props.phase.modelSelected.data !== 'T-Shirt' && props.phase.modelSelected.data !== 'Long sleeve' ? img3 : img;
                     

                       

                
        let canvas = new fabric.StaticCanvas('canvas', {
                        
                        width: 350,
                        height: 410,
                        backgroundColor: props.phase.colorSelected.data,
                        preserveObjectStacking: true,
                        selection: false,
        
        })
          .add(new fabric.Image(imgBlob, {
                        scaleX: props.phase.modelSelected.data === 'Long sleeve' ?  0.57 : 0.8,
                        scaleY: props.phase.modelSelected.data === 'Long sleeve' ? 0.5 : 0.7,
                        width: props.phase.modelSelected.data === 'Long sleeve' ? 880 : 520,
                        height: props.phase.modelSelected.data === 'Long sleeve' ? 860 : 585,
                        left: props.phase.modelSelected.data === 'Long sleeve' ? -72 : -38,
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

                const validExtensions = {
                        jpg: '',
                        jpeg: '' ,
                        png: '',
                        svg: '',
                }

                if(!validExtensions.hasOwnProperty(e.target.value.split('.')[1])) {
                        return swal({
                                title: 'Invalid file',
                                text: 'Your file has an invalid extension. We only accept images as avatars.',
                                icon: 'error',
                        })
                }
                
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
                                                                border: '1px solid coral', 
                                                                padding: '8px 40px 8px 40px', 
                                                                fontSize: '18px', 
                                                                backgroundColor: '#FEC601',
                                                                fontFamily: 'Roboto Condensed, sans-serif',
                                                                fontWeight: 900,
                                                                color: 'black',
                                                                borderRadius: '12px',
                                                                borderColor: 'salmon',
                                                                margin: '20px 0px 0px 0px'
                                                        }}>
                                                                Upload Image
                                                        
                                                                <input type="file" accept="image/*" style={{display: 'none'}} onChange={setPhotoHandler}/>
                                                        </label>

                                                        <input 
                                                                type="submit" 
                                                                disabled={data === null} 
                                                                value={"Create Shirt"}
                                                                style={{
                                                                        borderRadius: '5px', 
                                                                        padding: '10px 40px 10px 40px', 
                                                                        fontSize: '18px', 
                                                                        backgroundColor: data !== null && 'rgb(19, 195, 5)',
                                                                        margin: '50px 0px 0px 0px',
                                                                        fontFamily: 'Roboto Condensed, sans-serif',
                                                                        fontWeight: 900,
                                                                        color: data !== null && 'white',
                                                                        borderColor: data !== null && 'mediumseagreen'
                                                                }} 
                                                        />
                                                
                                        </form>
                </div>)
}

export default ShirtDesign;