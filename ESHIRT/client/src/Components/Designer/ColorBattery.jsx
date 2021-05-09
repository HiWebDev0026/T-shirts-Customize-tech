import React from 'react';
import colorModifier from './helpers/shirtRenderer';

export default function ColorBattery(props) {

    const {setData, setPhase} = props.props;



    return (<div>
        <button style={{backgroundColor: 'yellow', 
                            width: '30%'}} 

                    onClick={()=> colorModifier('yellow', props.props, setData)}>AM</button>

            <button style={{backgroundColor: 'red', width: '30%'}} onClick={() => colorModifier('red', props.props, setData)}>
                R
            </button>
            <button 
                style={{backgroundColor: 'rgb(12, 155, 255, 0.6)',width: '16px'}} 
                onClick={() => colorModifier('lightblue', props.props, setData)}>
                CC
            </button>
            <button style={{backgroundColor: 'green', 
                            width: '30%'}} 

                    onClick={()=> colorModifier('green', props.props, setData)}>GR</button>

            <button style={{backgroundColor: 'violet', width: '30%'}} onClick={() => colorModifier('violet', props.props, setData)}>
                VI
            </button>
            <button 
                style={{backgroundColor: 'orange',width: '16px'}} 
                onClick={() => colorModifier('orange', props.props, setData)}>
                OR
            </button>
            <button style={{backgroundColor: 'coral', 
                            width: '30%'}} 

                    onClick={()=> colorModifier('coral', props.props, setData)}>CO</button>

            <button style={{backgroundColor: 'gray', width: '30%'}} onClick={() => colorModifier('gray', props.props, setData)}>
                GRAY
            </button>
            <button 
                style={{backgroundColor: 'cyan',width: '16px'}} 
                onClick={() => colorModifier('cyan', props.props, setData)}>
                CY
            </button>
    </div>)
}