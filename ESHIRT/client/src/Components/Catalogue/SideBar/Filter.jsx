import React from 'react'
import style from './Filter.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect, forwardRef} from 'react'
import {filterByCategory, getCategories} from '../../../Actions/index'

function Filter(){
    
    const dispatch= useDispatch()
    const allCategories= useSelector(state => state.categoryReducer.allCategories)
    const filteredByCategories = useSelector(state => state.shirtReducer.filteredByCategory)
    const [filtered, setFiltered]= useState([])

    useEffect(() => {

        if(allCategories.length < 1) {
        dispatch(getCategories())
        return;
        }

        if(filtered.length > 0 && filteredByCategories.length < 1) {
            alert('No categories matching');
        }
        


    }, [allCategories, filteredByCategories])

    function handleChange(e){
        /* let flag= false
        for (let i=0; i< filtered?.length; i++){
            if (filtered[i]===e.target.value){
                flag=true
            }
        } */
        setFiltered(prevState => {
            
            if(!prevState.includes(e.target.value)){
                
                    return [...prevState, e.target.value]
                }else{
                    return [...prevState.filter(cat => cat !== e.target.value)]
                }
                })        
       /*  if (!flag){
        setFiltered(filtered?.concat(e.target.value))
        }
        else {
            setFiltered(filtered?.filter(i => i!==e.target.value))
        }   */

        /* console.log('Filter.jsx', filtered); */
        return;
    }

    function handleClick(){
        dispatch(filterByCategory(filtered))
        return;
    }


    return (
        <div className={style.container}>   
            <a href= '#popup'>
            <h3 className={style.h3}>Filter by category</h3>
            </a>
            <div id= 'popup' className={style.popup}>  
            <div className={style.both}>
            <div className={style.boxes}>
            {allCategories.map((e, i) => {
                return ( 
                    <div className={style.box} key={i*3.25}>
                        <input  className={style.input} type="checkbox" id={i} value={e.name} onChange={handleChange}/>
                        <label  className={style.label} htmlFor={i}>{e.name}</label >
                        
                    </div>
                )
            })}
            </div>
                <button className={style.btn} onClick={handleClick}>FILTER</button>
            </div>
            </div>
        </div>
    )
}

export default Filter