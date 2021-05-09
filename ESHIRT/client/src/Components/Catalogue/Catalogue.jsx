import style from "./Catalogue.module.css";
import React, {useState, useEffect} from "react";
import Card from './Card/Card.jsx'
import ReactPaginate from "react-paginate";
import Button from '@material-ui/core/Button'
import {useDispatch, useSelector} from 'react-redux'
import {getShirts} from '../../Actions/Actions'

// {title, price, width, height, model, color}

const INITIAL_PAGE= 3;

function Catalogue(){
    let example= [
        {title: 'Ema', price: 100, width: 120, height: 165, model: 'V-NECK', color: 'Blue', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'},
        {title: 'Javi', price: 200, width: 100, height: 150, model: 'ROUNDED', color: 'White', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Agus', price: 250, width: 110, height: 155, model: 'LONG-SLEEVED', color: 'Red', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Eze', price: 150, width: 60, height: 140, model: 'T-SHIRT', color: 'Yellow', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Lean', price: 300, width: 130, height: 175, model: 'ROUNDED', color: 'Pink', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Ger', price: 90, width: 115, height: 160, model:'T-SHIRT', color: 'Green', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'},
        {title: 'Dani', price: 90, width: 115, height: 160, model:'T-SHIRT', color: 'Pink', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}
    ]
    const dispatch= useDispatch()
    const allShirts= useSelector(state => state.allShirts)
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);


    useEffect(()=>{
        dispatch(getShirts())
    }, [])


function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * INITIAL_PAGE;

  const currentPageData = allShirts
    .slice(offset, offset + INITIAL_PAGE)
    .map(e => {
        return <Card
            title= {e.title}
            price= {e.price}
            width= {e.width}
            height= {e.height}
            model= {e.model}
            color= {e.color}
            image= {e.image}
        />
    })
    

  const pageCount = Math.ceil(example.length / INITIAL_PAGE);


    return (
        <div>
        <div className={style.container1}>
   
        <div>{currentPageData}</div>

        <ReactPaginate
        previousLabel={<Button color="primary">← Previous</Button>}
        nextLabel={<Button color="primary">Next →</Button>}
        pageCount={pageCount}
        onPageChange={handlePageClick}        
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        containerClassName={style.pagination}
        />

        </div>   
        </div>
    )
}

export default Catalogue