import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import {useHistory} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import Style from "./RecycleBinDesigns.module.css";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';


export default function RecycleBinDesigns(){
  
    const [currentPage, setCurrentPage] = useState(0);
    const designsTotal = useSelector((state) => state.shirtReducer.allShirts);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const [count, setCount] = useState([]);
    const [input2, setInput2] = useState('');

    let designs= [];
    designsTotal.map((desing) => {
    if (desing.public === 'false')
    {designs.push({
        id: desing.id,
        name: desing.name,
        print: desing.print
      })
    }})

    useEffect(() => {
      dispatch(getShirts());
    }, []);

    function handleDelete(e) {
        dispatch(deleteShirt(parseInt(e.target.value))); 
        setCount(count +1);
        dispatch(getShirts())
        swal({ 
          title: "DELETE", 
          text: "Design " + e.target.value + " deleted",
          icon: "error",
          timer: 3500,
          padding: "0.75rem"
          });
          dispatch(getShirts())
      };

      function handlePublic(e) {
        const value = e.target.value;
        setInput2(
            value
        );
    }
      function handleEdit (e) {
        if(input2.length >0){  
        e.preventDefault();
        dispatch(putShirt({public: input2 === 'true' ? 'true' : 'buy_authorize' }, e.target.value));
        setCount(count +1);
        dispatch(getShirts())
        swal({ 
          title: "Modified", 
          text: "Design " + e.target.value + " modified",
          icon: "success",
          timer: 3500,
          padding: "0.75rem"
          });
        }    
        dispatch(getShirts())
    }

     ///////////PAGINATION//////////////////////////////
  const INITIAL_PAGE= 4;
  const offset = currentPage * INITIAL_PAGE;
  const pageCount = Math.ceil(designs.length / INITIAL_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}

    return(
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div className={Style.General}>
     <div className={Style.Title}> <h1 >Deleted and non-public designs</h1></div>
      <div className={Style.Desings}>      
{designs.length > 0  
      ? ( designs.slice(offset, offset + INITIAL_PAGE).map((shirt) => {
          
          return (
            <div className={Style.Designs1}>
              <div className={Style.Tarjet}>
              <img src={shirt.print} className={Style.Img}/>
         <div className={Style.Btns}>
        <form>
          <div className={Style.Public}> 
          <h4>Public?</h4>
         <label>Yes</label>
                    <input type="radio" name="public" value="true" onChange= {handlePublic}  />
                    <label>Buy_authorize</label>
                    <input type="radio" name="public" value="buy_authorize" onChange= {handlePublic}  />
                    </div>
                    </form>
         <button className={Style.Btn2} value={shirt.id} type='submit' onClick={handleEdit} >Submit</button>
         </div>
         <div><button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>REMOVE</button> </div>
        </div>
             
              </div>
               
          );
      
        })
      ) : (<p>Desings not found</p>)}
</div>
<div>
<div className={Style.pages}>
                    <ReactPaginate
                        previousLabel={'← Previous'}
                        nextLabel={'Next →'}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}        
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={Style.pagination__link__disabled}
                        activeClassName={Style.pagination__link__active}
                        containerClassName={Style.pagination}
                    />  
                </div>
<NavLink to='recycleBin'>
    <h4 className={Style.Btn3}>RECYCLE BIN</h4>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
        
        </div>
        </div>
    )
}