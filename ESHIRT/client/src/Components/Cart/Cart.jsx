import React from 'react'
import style from './Cart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'

export function Cart(){

    return (
        <div>
            <div className={style.items}>

            </div>
            <div className={style.total}>

            </div>
        </div>
    )
}