import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {getShirtsByName, getShirts, resetShirtSearch} from '../../Actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Style from './SearchBar.module.css';


function SearchBar(){

    let dispatch = useDispatch()
    const [searchString, setSearchString]= useState('')
    const shirtsByName= useSelector(state => state.shirtReducer.shirtsByName)

    function handleChange(e) {
        setSearchString(prevState => prevState = e.target.value)
        
        return
    }
    const history = useHistory()

    useEffect(() => {
    
            if(searchString.length == 0) {
                dispatch(resetShirtSearch())
                dispatch(getShirts("true"))
                return;
            }

            dispatch(getShirtsByName(searchString, "true"))

    },[searchString, shirtsByName.length])

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getShirtsByName(searchString, "true"))
        
        history.push('/catalogue')
    }

    return(
        <div>
            <form onSubmit = {(e)=> handleSubmit(e)}>
                <input className={Style.inputBox} type='text' placeholder= 'Find your next shirt' value ={searchString} onChange={(e)=>handleChange(e)}/>
             <input className={Style.inputBtn} disabled={searchString.length < 2} type='submit' value={'Search'}/>
            </form>
        </div>
    )
}

export default SearchBar;