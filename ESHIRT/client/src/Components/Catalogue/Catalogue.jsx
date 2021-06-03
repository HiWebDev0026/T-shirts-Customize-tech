import style from "./Catalogue.module.css";
import React, {useState, useEffect} from "react";
import Card from './Card/Card.jsx';
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from 'react-redux'


//import {getShirts} from '../../Actions/Actions'
import {getShirts} from '../../Actions/index'

import SideBar from './SideBar/SideBar'
import { SideCart } from "../Cart/SideCart";


// {title, price, width, height, model, color}

const INITIAL_PAGE= 9;

function Catalogue(){
    
    const dispatch= useDispatch()
    const allShirts= useSelector(state => state.shirtReducer.allShirts)
    const shirtsByName= useSelector(state => state.shirtReducer.shirtsByName)
    const filteredByCategory= useSelector(state => state.shirtReducer.filteredByCategory)
    
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);


    useEffect(()=>{
        /* if (shirtsByName.length === 0){
            dispatch(getShirts("true"))
            return;
        } */

        filteredByCategory?.length>0 ? setData(filteredByCategory) : shirtsByName.length>0 ? setData(shirtsByName) : setData(allShirts)

    }, [filteredByCategory, shirtsByName, allShirts])

   /*  useEffect(() => {
        filteredByCategory?.length>0 ? setData(filteredByCategory) : shirtsByName.length>0 ? setData(shirtsByName) : setData(allShirts)
    }, [filteredByCategory, shirtsByName, allShirts]) */

function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  
 /*  <button onClick={()=>dispatch(getShirts())}></button>
  '/status?=pending' */
  const offset = currentPage * INITIAL_PAGE;
  console.log(data)
  const currentPageData= data
  .slice(offset, offset + INITIAL_PAGE)
  .map((e) => {
    if ( e.status !== 'deleted' && e.public === 'true'){
    return (        

        <Card
            title= {e.name}
            price= {e.price}
            size= {e.size}
            model= {e.model}
            color= {e.color}
            image= {e.print}
            score= {e.score}   
            id={e.id}         
        />
    )
    }

})
  
    

  const pageCount = Math.ceil(data.length / INITIAL_PAGE);

    /* console.log(allShirts, shirtsByName, filteredByCategory) */

    return (
        <div className={style.container1}>
        
            
            <div className={style.sideBar}>
                <SideBar/>
            </div>
        <div className={style.box}>
            <div className={style.shirts}>
            {
                currentPageData
            }
            </div>
            <div className={style.pages}>
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    pageCount={data < INITIAL_PAGE ? 1 : pageCount}
                    onPageChange={handlePageClick}        
                    previousLinkClassName={style.pagination__link}
                    nextLinkClassName={style.pagination__link}
                    disabledClassName={style.pagination__link__disabled}
                    activeClassName={style.pagination__link__active}
                    containerClassName={style.pagination}
                />
            </div>

        </div>
        
           {/*  <SideCart/> */}
        

        </div>   
    )
}

export default Catalogue