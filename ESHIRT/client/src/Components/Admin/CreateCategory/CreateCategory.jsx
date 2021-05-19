import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCategories,postCategory,deleteCategory,putCategory, resetErrors} from '../../../Actions/index.js'
import {NavLink} from 'react-router-dom';
import Style from './CreateCategory.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';


export default function CreateCategory (){

    const [category,setCategory]= useState('');
    const [editButtonTarget, setEditButtonTarget] = useState(0)
    const [change, setChange]=useState('');
    const isAdmin = useTokenDecode(localStorage.currentToken);

    const categories= useSelector((state)=>state.categoryReducer.allCategories)
    const errors = useSelector((state) => state.globalReducer.errors)
    
    const dispatch= useDispatch();


    useEffect(()=>{

        dispatch(getCategories());

        if (errors) {
            alert(`${errors.message}`)
            dispatch(resetErrors())
        }

    }, [errors, categories.length]);

  /*   useEffect(() => {
        console.log(errors)
        
    }) */

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(postCategory({'name':category})); 
    };

    function handleEdit (e) {
        e.preventDefault();
        dispatch(putCategory({'name':change}, editButtonTarget));
        setChange('');
    }

    function handleDelete (e) {
        dispatch(deleteCategory(parseInt(e.target.value)));
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
        !isAdmin ? (<ErrorNoAdminPage />) : <div>
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
                                    <button className={Style.Btn2} value={category.id} onClick={(e)=>setEditButtonTarget(parseInt(e.target.value))}>Edit</button>
                                    {editButtonTarget === category.id && showEditbutton()}
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
        <div className={Style.ContBtn3}>
        <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
        </NavLink>
    </div>
    </div>
    );
};