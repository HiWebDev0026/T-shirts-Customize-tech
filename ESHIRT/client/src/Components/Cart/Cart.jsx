import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {clear} from '../../Actions/cart.js'
import CartItem from './CartItem.jsx'
import Style from './Cart.module.css'

export default function Cart (){
    
    const cartFromLocalStorage=JSON.parse(localStorage.getItem('items') || '[]'); 

    // let cartFromLocalStorage2 =cartFromLocalStorage.map(c=> 
    //     {return {
    //         shirtId: c.id,
    //         size: c.size,
    //         amount: c.amount,
    //         price: c.price
    //     }})

    const [currentPage, setCurrentPage] = useState(0);

    const items = useSelector((state)=>state.cartReducer.items);
    const  dispatch= useDispatch();
   
    const INITIAL_PAGE= 4;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(items.length / INITIAL_PAGE);

    // const {user,isAuthenticated}=useAuth0();
   
    useEffect(()=>{
            localStorage.setItem('items',JSON.stringify(items));
        },[items])
        
    // },[items]);
    // useEffect(()=>{
    //     if(!isAuthenticated){
    //         localStorage.setItem('items',JSON.stringify(items));
    //     }else if(isAuthenticated){
    //         axios.get('')
    //     }
        
    // },[items]);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
      }
    
    function handleClear(){
        dispatch(clear())
    }
   
    return(
        <div className={Style.general}>
            <div className={Style.container}>
                <div className={Style.left}>
                    <div className={Style.title}>
                        <h2>Let's do some shopping!</h2>
                    </div >
                    <ul>
                        {
                            items.length>0?
                            items.slice(offset, offset + INITIAL_PAGE).map(it=>{
                                return <CartItem  it={it} key={it.id}  className={Style.cartCard}/>      
                            })
                        :<p>No selected items</p>
                        }
                    </ul>
                </div>
                <div className={Style.rigth}>
                    <div className={Style.total}>
                        <h2>Total</h2>
                    </div>
                    <div>{
                        items.length === 0? 
                        <div>Your cart is empty</div>
                        :<div>You have {items.length} items in your shopping cart</div>
                    }</div>
                    <div>${items.reduce((a,c)=>a+c.price*c.amount,0)}</div>
                    <Link to='/catalogue'>
                        <button>Go back shopping</button>
                    </Link>
                    {items.length >0&&<button>Purchase</button>}
                    {items.length >0&&<button onClick={handleClear}>Clear cart</button>}
                    
                </div>
            </div>
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
        </div>
    )
}