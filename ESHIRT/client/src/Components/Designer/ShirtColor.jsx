import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {fabric} from 'fabric';
import img from '../../assets/img/random_remera_front.png';

function ShirtModel(props) {

    const [shirt, setShirt] = useState();

    const shirtRef = useRef(null);
    const imageRef = useRef(null);
    
    useEffect(()=>{

        let imgBlob = new Image();
        imgBlob.style.width = '12px';
        imgBlob.src = img;
        
        console.log(imgBlob);

        /* let canvas = new fabric.Canvas('canvas', {
            height: 550,
            width: 580,
            backgroundColor: 'rgb(0, 0, 0, 0.2)',
        }) */

        

        
            let canvas = new fabric.Canvas('canvas', {
                
                width: 430,
                height: 560,
                backgroundColor: 'rgb(255, 255, 255, 0.4)',
                
                preserveObjectStacking: true,

            })
            .on('selection:created', (e) => {

                e.target.lockScalingX = true;
                 e.target.height = 80; })

            .add(new fabric.Image(imgBlob, {
                width: 490,
                height: 560,
                left: -50,
                selectable: false,
                objectCaching: false,
                
            }));

            

            

            
                /* var maxScaleX = 2;
                var maxScaleY = 2;

                if(this.scaleX > maxScaleX) {
                    this.scaleX = maxScaleX;
                    this.left = this.lastGoodLeft;
                    this.top = this.lastGoodTop;
                    
                  }
                  if(this.scaleY > maxScaleY) {
                    this.scaleY = maxScaleY;
                    this.left = this.lastGoodLeft;
                    this.top = this.lastGoodTop;
                  }
                  this.lastGoodTop = this.top;
                  this.lastGoodLeft = this.left; */
                /* let addedTangle        = e.target
                ,   maxWidth     = addedTangle.get("maxWidth")
                ,   maxHeight    = addedTangle.get("maxHeight")
                ,   actualWidth  = addedTangle.scaleX * addedTangle.width
                ,   actualHeight = addedTangle.scaleY * addedTangle.height;
            
                if(!isNaN(maxWidth) && actualWidth >= maxWidth){
                    // dividing maxWidth by the addedTangle.width gives us our 'max scale' 
                    addedTangle.set({scaleX: maxWidth/addedTangle.width})
                }
            
                if(!isNaN(maxHeight) && actualHeight >= maxHeight){
                    addedTangle.set({scaleY: maxHeight/addedTangle.height})
                } */
            
                /* console.log("width:" + (addedTangle.width * addedTangle.scaleX) + " height:" + (addedTangle.height * addedTangle.scaleY)) }*/
                
/* canvas.on('scaling', );

            
         */
        
                
        
            
        setShirt(canvas); 
        /* canvas.renderAll(); */

        setTimeout(() => canvas.renderAll(), 10);
        

    }, [])

    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            
            <canvas ref={shirtRef} id="canvas"/>
            <div style={{display: 'flex', flexDirection: 'column', width: '5%'}}>
            <button style={{backgroundColor: 'yellow', width: '30%'}} onClick={()=> {

                let img = new Image();
                /* let reader = new FileReader(); */
                
                /* reader.onloadend = function() {
                    var base64data = reader.result;                
                    console.log(base64data);
                } */
                img.src = shirtRef.current.toDataURL();
                
                shirtRef.current.style.backgroundColor = 'yellow'
                /* imageRef.current.appendChild = img; */

                /* imageRef.current.firstChild = img; */
                
                /*fetch(img.src).then(console.log).then(res=>reader.readAsDataURL(res))
                 */
                return;
            }}>AM</button>
            <button style={{backgroundColor: 'red', width: '30%'}} onClick={() => {
                shirtRef.current.style.backgroundColor = 'red'
                return;
            }}>
                R
            </button>
            <button style={{backgroundColor: 'rgb(12, 155, 255, 0.6)', width: '30%'}} onClick={() => {
                shirtRef.current.style.backgroundColor = 'rgb(12, 155, 255, 0.6)'
                return;
            }}>
                CEL
            </button>
            </div>
            
        </div>
    )
}

export default ShirtModel;