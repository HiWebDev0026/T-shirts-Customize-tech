import React, {useState, useEffect} from 'react';
import SizeCSS from './ShirtSize.module.css';
import swal from 'sweetalert';

function ShirtSize(props) {


    const [data, setData] = useState(null);
    useEffect(()=> {

        if(data!== null){
                        swal({
                            title: data,
                            icon: 'success',
                            text: 'The size '+data+' has been selected. Choose your colour.',
                            buttons: ['Choose another model', 'CHOOSE COLOUR']
                        }).then((allow)=> {
                            if(data!==null && allow) {
                                props.setPhase({
                                sizeSelected: {data, status: true}, 
                                colorSelected: {...props.phase.colorSelected, status: false}})};
                                return;}
                        )
                    }
       }, [data])
    

    return (<div className={SizeCSS.containerOfSize}>
                <div className={SizeCSS.title}>
                    <h4>
                    Choose the size of your custom shirt
                    </h4>
                    </div>
                <div className={SizeCSS.sizeCardContainer}>
                    <div className={SizeCSS.sizeCard} style={props.phase.sizeSelected.data === 'S' ? {transform: 'scaleX(1.1) scaleY(1.1)', backgroundColor: 'rgba(50, 200, 12, 0.4)'} : {}}onClick={()=>{
                        setData('S')
                    }}>
                        <h2>S</h2>
                    </div>
                    <div className={SizeCSS.sizeCard} style={props.phase.sizeSelected.data === 'M' ? {transform: 'scaleX(1.1) scaleY(1.1)', backgroundColor: 'rgba(50, 200, 12, 0.4)'} : {}} onClick={()=>{
                        return setData('M')
                    }}>
                        <h2>M</h2>
                    </div>
                    <div className={SizeCSS.sizeCard} style={props.phase.sizeSelected.data === 'L' ? {transform: 'scaleX(1.1) scaleY(1.1)', backgroundColor: 'rgba(50, 200, 12, 0.4)'} : {}} onClick={()=>{
                        return setData('L')
                    }}>
                        <h2>L</h2>
                    </div>
                    <div className={SizeCSS.sizeCard} style={props.phase.sizeSelected.data === 'XL' ? {transform: 'scaleX(1.1) scaleY(1.1)', backgroundColor: 'rgba(50, 200, 12, 0.4)'} : {}}onClick={()=>{
                        return setData('XL')
                    }}>
                        <h2>XL</h2>
                    </div>
                        {/* <form className={SizeCSS.form} onSubmit={(e)=> {
                            e.preventDefault();
                            if(data!==null) {
                                                            props.setPhase({
                                                            sizeSelected: {data, status: true}, 
                                                            colorSelected: {...props.phase.colorSelected, status: false}})};
                                                            return;}}>
                                                                
                                                                    <select type="datalist" 
                                                                            onChange={(e)=> setData(e.target.value)} 
                                                                            value={data}>
                                                                        <option value="">Size</option>
                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                        <option value="M">M</option>
                                                                        <option value="S">S</option>

                                                                    </select>
                                                                
                                                                
                                                                    <input type="submit" disabled={data===null} value={data !== null ? 'Next' : 'Select size'} />
                                                                
                        </form> */}
                </div>
                
    </div>)
}

export default ShirtSize;