import React from 'react'
import style from './Filter.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {filterByCategory, getCategories} from '../../../Actions/Actions'

function Filter(){
    
    const dispatch= useDispatch()
    const allCategories= useSelector(state => state.allCategories)
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
        <div>   
            {allCategories.map((e, i) => {
                return <label><input type="checkbox" id={i} value={e.name} onChange={handleChange}/> {e.name} </label>
            })}
            <button onClick={handleClick}>FILTER</button>
        </div>
    )
}

export default Filter