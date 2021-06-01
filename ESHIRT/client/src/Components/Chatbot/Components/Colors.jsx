import React from 'react';
import ColorBatteryCSS from '../../Designer/ColorBattery.module.css'

function Colors() {

    return (<div className={ColorBatteryCSS.container}>

        <button style={{backgroundColor: 'red', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            RED
        </button>

        <button style={{backgroundColor: 'coral', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            CORAL
        </button>

        <button style={{backgroundColor: 'orange', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            ORANGE
        </button>

        <button style={{backgroundColor: 'yellow', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            YELLOW
        </button>

        <button style={{backgroundColor: 'green', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            GREEN
        </button>

        <button style={{backgroundColor: 'cyan',borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            CYAN
        </button>

        <button 
            style={{backgroundColor: 'rgb(12, 155, 255)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            L-BLUE
        </button>

        <button style={{backgroundColor: 'rgb(10, 10, 255, 0.6)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            BLUE
        </button>

        <button style={{backgroundColor: 'darkorchid', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            PURPLE
        </button>


        <button style={{backgroundColor: 'rgb(20, 20, 20)', borderRadius: '8px', fontSize: '18px', borderColor: 'black', color: 'white'}} >
            BLACK
        </button>

        <button style={{backgroundColor: 'gray', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            GRAY
        </button>


        <button style={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: '8px', fontSize: '18px', borderColor: 'black'}} >
            WHITE
        </button>

    </div>)
}

export default Colors;