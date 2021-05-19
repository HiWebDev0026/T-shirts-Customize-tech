const colorModifier = (color, props, setData, shirtRef, imageRef) => {
                setData(color)
                props.setPhase({colorSelected: {status: false, data: color}})
                

                /* imageRef.current.appendChild = img; */

                /* imageRef.current.firstChild = img; */
                
                /*fetch(img.src).then(console.log).then(res=>reader.readAsDataURL(res))
                 */
                return;
}

export default colorModifier;


const convertToBlob = async (shirtRef) => {
    try {
    const img = await shirtRef.current.toDataURL();

    const newImage = await new Image();
    newImage.src = img;
    /* imageRef.current.appendChild(newImage); */
    return console.log('test2:', newImage);
    } catch(err){
        console.log(err);
    }
}

/* setTimeout(()=> convertToBlob(), 155); */