import React, {useState, useEffect} from 'react';
import SizeCSS from './ShirtSize.module.css';


function ShirtSize(props) {


    const [data, setData] = useState(props.phase.sizeSelected.data);
/* 
    useEffect(()=> {


        return () => props.setPhase({sizeSelected: true,})

    }, []) */

    return (<div className={SizeCSS.container}>
                <div className={SizeCSS.title}>
                    <h3>
                    Choose the size of your custom shirt
                    </h3>
                <div className={SizeCSS.formContainer}>
                        <form className={SizeCSS.form} onSubmit={(e)=> {
                            e.preventDefault();
                            if(data!==null) {
                                                            props.setPhase({
                                                            sizeSelected: {data, status: true}, 
                                                            colorSelected: {...props.phase.colorSelected, status: false}})};
                                                            return;}}>
                                                                <div className={SizeCSS.select}>
                                                                    <select type="datalist" 
                                                                            onChange={(e)=> setData(e.target.value)} 
                                                                            value={data}>

                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                        <option value="M">M</option>
                                                                        <option value="S">S</option>

                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <input type="submit" disabled={data===null} value={data !== null ? 'Next' : 'Select size'} />
                                                                </div>
                        </form>
                </div>
                </div>
    </div>)
}

export default ShirtSize;