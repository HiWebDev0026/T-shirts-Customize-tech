import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getCategories,postCategory,deleteCategory,putCategory} from '../../../Actions/Actions.js'

import Style from './CreateCategory.module.css';

export default function CreateCategory (){

    const [category,setCategory]= useState('');
    const [remove,setRemove]= useState(true);
    const [editButtonTarget, setEditButtonTarget] = useState(0)
    const [change, setChange]=useState('');
 
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

    function handleEdit (e) {
        setEditButtonTarget(e.target.value)
    }

    function showEditbutton (){
        return (
        <div>
            <input type='text' value={change} onChange={(e)=> setChange(e.target.value)}/>
            <input className={Style.Btn} type='submit'/>
        </div>
        )
    }

    return(
        <div className={Style.general}>
            <div>
                <h1 className= {Style.TitleCategory}>Categories</h1>
                <div className={Style.Categories}>
                    {
                        categories.length>0?
                        categories.map((category)=>{
                        return <div className={Style.Tarjet} key={category.id}>
                                    <p className={Style.Titles}>{category.name}</p>
                                    <div className={Style.Contenedores}>
                                    <button className={Style.Btn1} value={category.id} onClick={handleDelete}>X</button>
                                    <button className={Style.Btn2} value={category.id} onClick={handleEdit}>Edit</button>
                                    {editButtonTarget == category.id && showEditbutton()}
                                    </div>
                            </div>
                            
                        })
                        :<p>Categories not found</p>
                    }
                </div>
            </div>

            <div className={Style.Contains}>
            <form id='miForm' onSubmit={handleSubmit}>
            <h1 className={Style.Create}>Create new category</h1>
            <div className={Style.ContainCreate} >
            <input className={Style.Create1} type='text' value={category} placeholder='Type Category' onChange={(e)=>setCategory(e.target.value)}/>
            <input className={Style.Create2} type="submit" value="ADD"></input>
            </div>
            </form>
            </div>
        </div>
    );
};