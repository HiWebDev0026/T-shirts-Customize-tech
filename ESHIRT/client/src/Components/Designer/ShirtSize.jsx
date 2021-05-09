import React, {useState, useEffect} from 'react';



function ShirtSize(props) {


    const [data, setData] = useState(null);
/* 
    useEffect(()=> {


        return () => props.setPhase({sizeSelected: true,})

    }, []) */

    return (<div style={{display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'center'}}>
                <div style={{width: 'max-content', display:'flex'}}>
                    <h3 style={{width: 'max-content', color: 'white'}}>
                    'SIZE'
                    </h3>
                </div>
                <div style={{margin: '0 auto', width: 'max-content'}}>
                        <form onSubmit={()=> {if(data!==null) {
                                                            props.setPhase({
                                                            sizeSelected: {data, status: true}, 
                                                            colorSelected: {...props.phase.colorSelected, status: false}})};
                                                            return;}}>
                            <select type="datalist"onChange={(e)=> setData(e.target.value)} value={data}>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="M">M</option>
                                <option value="S">S</option>
                            </select>
                            <input type="submit" disabled={data===null} value={data !== null ? 'Continuar' : 'Seleccionar tamaño'} />
                        </form>
                </div>
    </div>)
}

export default ShirtSize;