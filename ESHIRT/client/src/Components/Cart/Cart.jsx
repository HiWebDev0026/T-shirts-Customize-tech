import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Payment from './Payment/Payment'
import {NavLink} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {useHistory} from 'react-router-dom'

import {
    getOrdersByUserId,
    getOrderById,
    putOrder,
    createPayment,
    setCartItems,
    checkLastOrder,
    postOrder
} from '../../Actions/index.js'
import CartItem from './CartItem.jsx'
import Style from './Cart.module.css'
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart (props){
    
    const cartFromLocalStorage=JSON.parse(localStorage.getItem('items') || '[]'); 
    const history= useHistory()
    const {match} = props;

    // let cartFromLocalStorage2 =cartFromLocalStorage.map(c=> 
    //     {return {
    //         shirtId: c.id,
    //         size: c.size,
    //         amount: c.amount,
    //         price: c.price
    //     }})

    const [currentPage, setCurrentPage] = useState(0);
    const items = useSelector((state)=>state.cartReducer.items);
    const orderId = useSelector((state)=>state.ordersReducer.orderId);
    const shirts = useSelector((state)=>state.shirtReducer.allShirts);
    /* const orderId = parseInt(match.params.orderId) */
    const paymentData = useSelector((state)=>state.paymentReducer.paymentData)

    const  dispatch= useDispatch();
    const INITIAL_PAGE= 4;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(items.length / INITIAL_PAGE);
    
    const {isAuthenticated, user, loginWithPopup}=useAuth0();

    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items));
       
         /*    if (isAuthenticated) {
              dispatch(checkLastOrder(user.sub.split('|')[1]))
              setHasChecked(true);
            }
        
            return ()=> setHasChecked(false);
          */
    },[items, isAuthenticated])

    function proceed(click, id){
        return (
            <div onClick={(e)=> click(e, id)}>
                <NavLink to='/payment' >
                    <button>Go to pay</button>
                </NavLink>
            </div>
        )
    }

    function notProceed(){
        return (
            <div>
                Login to proceed
            </div>
        )
    }

    function click(e, id){
        e.preventDefault()
        if (id == 0) {

            console.log('click function', 'POST')
            dispatch(postOrder([...items], user.sub.split('|')[1]))

          } else if (id) {
            console.log('click function', 'PUT')
            dispatch(putOrder([...items], id, 'add'))
          } 
    }

    useEffect(()=> {
        if (isAuthenticated && orderId === 0) {
            dispatch(postOrder([...items], user.sub.split('|')[1]))
          } else if (isAuthenticated && orderId) {
            dispatch(putOrder([...items], orderId, 'add'))
          } else if (isAuthenticated){
              dispatch(checkLastOrder(user.sub.split('|')[1]))
          }
    }, [isAuthenticated])

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    
    const handleCartChange = (e, operation) => {
        e.preventDefault();
        dispatch(setCartItems({}, operation))
        if (isAuthenticated) {
            dispatch(putOrder([], orderId, 'clear'))
        }
    }
                                
    //para cada item dentro de items, si !items.image
    // busco la imagen con el id en allShirts
    //agrego la imagen al item
    // let shirt ={}
    // console.log(shirts);
    // let prueba = items.map(item => {
    //     console.log("id", item.id);
    //     if(!item.hasOwnProperty('image')){
    //         shirt = shirts.find(shirt=> shirt.id === item.id)
    //         console.log(shirt);
    //         item.image = shirt.print;
    //     }
    //     console.log(shirt)
    //     return item;
    // })
    // console.log("prueba", prueba);



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
                            items.slice(offset, offset + INITIAL_PAGE).map((item, index)=>{
                            
                                let shirt ={}
                                if(!item.hasOwnProperty('image')){
                                    
                                    shirt = shirts.find(shirt=> shirt.id === item.id)
                                    item.image = shirt.print;
                                }
                                
                                return <CartItem  item={item} key={index} index={index} className={Style.cartCard}/>      
                            })
                        :<p>No selected items</p>
                        }
                    </ul>
                </div>
                <div className={Style.rigth}>
                    <div className={Style.total}>
                        <h2>Total</h2>
                    </div>
                    <div className={Style.total}>
                        <div className={Style.message}>{
                            items.length === 0? 
                            <div>Your cart is empty</div>
                            :<div>You have {items.reduce((a,c)=>a+c.amount,0)} items in your shopping cart</div>
                        }</div>
                    </div>
                    <div className={Style.totalPay}>
                        <div>${items.reduce((a,c)=>a+c.price*c.amount,0)}</div>
                    </div>
                        <div className={Style.buttons}>
                            <NavLink to='/catalogue'>

                                <button>Go back shopping</button>
                                
                            </NavLink>
                            
                            {
                                isAuthenticated ? proceed(click, orderId) : notProceed()
                            }
                            
                            {items.length >0&&<button onClick={(e) => handleCartChange(e, 'clear')}>Clear cart</button>}
                        </div>
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