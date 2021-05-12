import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCategories,postCategory,deleteCategory,putCategory} from '../../../Actions/index.js'
import Style from './CreateCategory.module.css';

export default function CreateCategory (){

    const [category,setCategory]= useState('');
    const [remove,setRemove]= useState(true);
    const [editButtonTarget, setEditButtonTarget] = useState(0)
    const [edit,setEdit] = useState(false);
    const [sent, setSent] = useState(false);
    const [change, setChange]=useState('');
 

    const categories= useSelector((state)=>state.categoryReducer.allCategories)
    
    const dispatch= useDispatch();


    useEffect(()=>{
        dispatch(getCategories());
    },[remove,edit,sent]);

    function handleSubmit (e) {
        alert('Category added')
        e.preventDefault();
        dispatch(postCategory({'name':category}));
        setSent(!sent);
        // setCategory('');   
    };

    function handleEdit (e) {
        alert('Category modified')
        dispatch(putCategory({'name':change},editButtonTarget));
        setEdit(!edit);
        // setEditButtonTarget(false);
        setChange('');
    }

    function handleDelete (e) {
        alert('Category deleted')
        dispatch(deleteCategory(e.target.value));
        setRemove(!remove);
    };

    function showEditbutton (){
        return (
        <div>
            <input type='text' value={change} placeholder='type new name' onChange={(e)=> setChange(e.target.value)}/>
            <input className={Style.Btn} type='submit' onClick={handleEdit}/>
            <button onClick={(e)=>setEditButtonTarget(false)}>Done</button>
        </div>
        )
    };

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
                                    <button className={Style.Btn2} value={category.id} onClick={(e)=>setEditButtonTarget(e.target.value)}>Edit</button>
                                    {editButtonTarget == category.id && showEditbutton()}
                                    </div>
                            </div>
                            
                        })
                        :<p>Categories not found</p>
                    }
                </div>
            </div>

            <div className={Style.Contains}>
            <form onSubmit={handleSubmit}>
            <h1 className={Style.Create}>Create new category</h1>
            <div className={Style.ContainCreate} >
            <input className={Style.Create1} type='search' value={category} placeholder='Type Category' onChange={(e)=>setCategory(e.target.value)}/>
            <input className={Style.Create2} type="submit" value="ADD"/>
            </div>
            </form>
            </div>
        </div>
    );
};