import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getCategories,postCategory,deleteCategory} from '../../../Actions/Actions.js'

import Style from './CreateCategory.module.css';

export default function CreateCategory (){

    const [category,setCategory]= useState('');
    const [remove,setRemove]= useState(true);
 
    console.log('ESTADO',category);

    const categories= useSelector((state)=>state.allCategories)
    const dispatch= useDispatch();
    console.log('VER',categories);

    useEffect(()=>{
        dispatch(getCategories());
    },[remove]);

    function handleSubmit (e) {
        console.log('ENTRE')
        e.preventDefault();
        dispatch(postCategory({'name':category}));
        setCategory('');   
    };

    function handleDelete (e) {
        console.log('ID',e.target.value);
        dispatch(deleteCategory(e.target.value));
        setRemove(!remove);
    };

    function handleEdit (e){
        console.log('EDIT', e.target.value)
    }

    return(
        <div className={Style.general}>
            <div>
                <h1>Categories</h1>
                <div>
                    {
                        categories.length>0?
                        categories.map((category)=>{
                        return <div key={category.id}>
                                    <p>{category.name}</p>
                                    <button value={category.id} onClick={handleDelete}>X</button>
                                    <button value={category.id} onClick={handleEdit}>Edit</button>
                            </div>
                            
                        })
                        :<p>Categories not found</p>
                    }
                </div>
            </div>
            <form id='miForm' onSubmit={handleSubmit}>
            <h1>Create new category</h1>
            <input type='text' value={category} placeholder='type category' onChange={(e)=>setCategory(e.target.value)}/>
            <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};