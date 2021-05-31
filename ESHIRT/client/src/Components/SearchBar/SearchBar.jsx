import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {getShirtsByName, getShirts, resetShirtSearch} from '../../Actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Style from './SearchBar.module.css';
import {ReactComponent as SearchButton} from '../../assets/149852.svg'


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
        <div className={Style.searchBarMainContainer}>
            <form onSubmit = {(e)=> handleSubmit(e)}>
                <div className={Style.searchContainer}>
                <input className={Style.inputBox} type='text' placeholder= 'Find your next shirt' value ={searchString} onChange={(e)=>handleChange(e)}/>
                <div className={Style.buttonSearchContainer}>
                    <div className={Style.backgroundSearchButton}>
                        <SearchButton className={Style.searchIcon} />
                    </div>
                    <input className={Style.inputBtn} name="searchBarButton" disabled={searchString.length < 2} type='submit' value="asd" />
                    </div>
             
             
             </div>
            </form>
        </div>
    )
}

export default SearchBar;