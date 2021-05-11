import React from 'react'
import style from './Filter.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {filterByCategory, getCategories} from '../../../Actions/index'

function Filter(){
    
    const dispatch= useDispatch()
    const allCategories= useSelector(state => state.categoryReducer.allCategories)
    const [filtered, setFiltered]= useState([])

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    function handleChange(e){
        let flag= false
        for (let i=0; i< filtered?.length; i++){
            if (filtered[i]===e.target.value){
                flag=true
            }
        }        
        if (!flag){
        setFiltered(filtered?.concat(e.target.value))
        }
        else {
            setFiltered(filtered?.filter(i => i!==e.target.value))
        }  
    }

    function handleClick(){
        dispatch(filterByCategory(filtered))
    }


    return (
        <div className={style.container}>   
            <h3 className={style.h3}>Filter by category</h3>
            <div className={style.both}>
            <div className={style.boxes}>
            {allCategories.map((e, i) => {
                return ( 
                    <div className={style.box}>
                        <input className={style.input} type="checkbox" id={i} value={e.name} onChange={handleChange}/>
                        <label className={style.label} for={i}>{e.name}</label>
                    </div>
                )
            })}
            </div>
                <button className={style.btn} onClick={handleClick}>FILTER</button>
            </div>
        </div>
    )
}

export default Filter