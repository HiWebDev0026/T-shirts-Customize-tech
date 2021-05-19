import React from 'react'
import style from './Order.module.css'

function Order(){

    return (
        <div className={style.container}>
            <select className={style.select}>
                <option className={style.option} value=''>Ordering</option>
                <option className={style.option} value='AZ'>AZ</option>
                <option className={style.option} value='ZA'>ZA</option>
                <option className={style.option} value='Up'>Up</option>
                <option className={style.option} value='Do'>Do</option>
            </select>
        </div>
    )
}

export default Order