import style from "./Catalogue.module.css";
import React, {useState, useEffect} from "react";
import Card from './Card/Card.jsx'
import ReactPaginate from "react-paginate";
import Button from '@material-ui/core/Button'
import {useDispatch, useSelector} from 'react-redux'
import {getShirts} from '../../Actions/Actions'
import SideBar from './SideBar/SideBar'
 
// {title, price, width, height, model, color}

const INITIAL_PAGE= 6;

function Catalogue(){
    
    const dispatch= useDispatch()
    const allShirts= useSelector(state => state.allShirts)
    const shirtsByName= useSelector(state => state.shirtsByName)
    const filteredByCategory= useSelector(state => state.filteredByCategory)
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);


    useEffect(()=>{
        if (shirtsByName.length === 0){
            dispatch(getShirts())
        }
    }, [])

    useEffect(() => {
        filteredByCategory?.length>0 ? setData(filteredByCategory) : shirtsByName.length>0 ? setData(shirtsByName) : setData(allShirts)
    })

function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  
  const offset = currentPage * INITIAL_PAGE;
  const currentPageData = data
    .slice(offset, offset + INITIAL_PAGE)
    .map(e => {
        return <Card
            title= {e.name}
            size= {e.size}
            model= {e.model}
            color= {e.color}
            image= {e.print}
            score= {e.score}
        />
    })
    

  const pageCount = Math.ceil(data.length / INITIAL_PAGE);

    console.log(allShirts, shirtsByName, filteredByCategory)

    return (
        <div className={style.container1}>
        
        <div className={style.box}>
            
            <div className={style.sideBar}>
                <SideBar/>
            </div>
        
        <div className={style.shirts}>{currentPageData}</div>
        </div>

        <div className={style.pages}>
        <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}        
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={style.pagination__link__disabled}
        activeClassName={style.pagination__link__active}
        containerClassName={style.pagination}
        />
        </div>

        </div>   
    )
}

export default Catalogue