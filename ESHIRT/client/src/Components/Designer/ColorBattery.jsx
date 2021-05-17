import React from 'react';
import colorModifier from './helpers/shirtRenderer';
import ColorBatteryCSS from './ColorBattery.module.css'

export default function ColorBattery(props) {

    const {setData, setPhase} = props.props;

    return (<div className={ColorBatteryCSS.container}>

        <button style={{backgroundColor: 'red', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('red', props.props, setData)}
        >
            RED
        </button>

        <button 
            style={{backgroundColor: 'coral', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={()=> colorModifier('coral', props.props, setData)}
        >
            CORAL
        </button>

        <button 
            style={{backgroundColor: 'orange', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('orange', props.props, setData)}
        >
            ORANGE
        </button>

        <button 
            style={{backgroundColor: 'yellow', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={()=> colorModifier('yellow', props.props, setData)}
        >
            YELLOW
        </button>

        <button 
            style={{backgroundColor: 'green', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={()=> colorModifier('green', props.props, setData)}
        >
            GREEN
        </button>

        <button 
            style={{backgroundColor: 'cyan',borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('cyan', props.props, setData)}
        >
            CYAN
        </button>

        <button 
            style={{backgroundColor: 'rgb(12, 155, 255)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('rgb(12, 155, 255)', props.props, setData)}
        >
            L-BLUE
        </button>

        <button 
            style={{backgroundColor: 'rgb(10, 10, 255, 0.6)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('rgb(10, 10, 255, 0.6)', props.props, setData)}
        >
            BLUE
        </button>

        <button style={{backgroundColor: 'darkorchid', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('darkorchid', props.props, setData)}
        >
            PURPLE
        </button>


        <button 
            style={{backgroundColor: 'rgb(20, 20, 20)', borderRadius: '8px', fontSize: '18px', borderColor: 'black', color: 'white'}} 
            onClick={() => colorModifier('rgb(20, 20, 20)', props.props, setData)}
        >
            BLACK
        </button>

        <button style={{backgroundColor: 'gray', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('gray', props.props, setData)}>
            GRAY
        </button>


        <button 
            style={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} 
            onClick={() => colorModifier('rgb(255, 255, 255)', props.props, setData)}>
            WHITE
        </button>

    </div>)
}