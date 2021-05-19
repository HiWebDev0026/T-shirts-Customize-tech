import React from 'react'
import Filter from './Filter'
import Order from './Order'
import style from './SideBar.module.css'

function SideBar(){

    return (
        <div className={style.container}>
            <Filter/>
            {/* <Order/> */}
        </div>
    )
}

export default SideBar