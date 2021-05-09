import React, {useEffect, useState} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';



function ShirtDesign(props) {

        const [data, setData] = useState(null);

      
        useEffect(()=> {
        let imgBlob = new Image(340, 420);
                imgBlob.src = img;
                
                console.log(imgBlob);
        
                /* let canvas = new fabric.Canvas('canvas', {
                    height: 550,
                    width: 580,
                    backgroundColor: 'rgb(0, 0, 0, 0.2)',
                }) */
        
                
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
                        
                    }));
        
        
                setTimeout(() => canvas.renderAll(), 222);
        })

        useEffect(()=> {
                if(data !== null && typeof data !== 'string') {
                        const conversion = async () => {
                                const fileConverted = await convertBase64(data);
                                setData(fileConverted);
                                return;
                        }

                        conversion();
                }
        }, [data])


        const setPhotoHandler = (e) => {

                setData(e.target.files[0]);
                return;
        }

        const convertBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
        })
                
        
            

    return (
                <div>
                        <canvas id="canvas" />
                        <form onSubmit={(e)=> {
                                e.preventDefault();
                                props.setPhase({...props.phase, designSelected: {status: true, data}, allGoodForSubmit: true,})
                        }}>
                                <input type="file" onChange={setPhotoHandler}/>
                                <input type="submit" value={"Añadir foto"} />
                        </form>
                </div>)
}

export default ShirtDesign;