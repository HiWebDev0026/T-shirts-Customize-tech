import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Payment from './Payment/Payment'
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {useHistory} from 'react-router-dom'

import {
    clear,
    getOrdersByUserId,
    getOrderById,
    postOrder,
    putOrder,
    checkLastOrder,
    createPayment
} from '../../Actions/index.js'
import CartItem from './CartItem.jsx'
import Style from './Cart.module.css'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export default function Cart (){
    
    const cartFromLocalStorage=JSON.parse(localStorage.getItem('items') || '[]'); 
    const history= useHistory()

    // let cartFromLocalStorage2 =cartFromLocalStorage.map(c=> 
    //     {return {
    //         shirtId: c.id,
    //         size: c.size,
    //         amount: c.amount,
    //         price: c.price
    //     }})

    const [currentPage, setCurrentPage] = useState(0);

    const items = useSelector((state)=>state.cartReducer.items);
    console.log('ITTEEMS',items)
    const orderId = useSelector((state)=>state.cartReducer.orderId);
    console.log('ORDERID',orderId)
    const paymentData = useSelector((state)=>state.paymentReducer.paymentData)

    const cart = useSelector(state => state.cartReducer.items)
    const isPosting = useSelector(state => state.ordersReducer.postStarted)
    const orderIdChecked = useSelector(state => state.ordersReducer.lastOrderChecked)
    const  dispatch= useDispatch();
    const [flag, setFlag]= useState(false)

    useEffect(() => {
        if (isAuthenticated && !orderIdChecked && !isPosting) {
            dispatch(checkLastOrder(user.sub.split('|')[1]))
        }

        if (isAuthenticated && orderId === 0 && !isPosting) {
            dispatch(postOrder(cart, user.sub.split('|')[1]))
        } else if (isAuthenticated && orderId) {
            dispatch(putOrder(cart, orderId))
        }
    }, [cart, isPosting])

   
    const INITIAL_PAGE= 4;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(items.length / INITIAL_PAGE);

    const {user,isAuthenticated, loginWithPopup}=useAuth0();
    // const userId= user.sub.split('|').pop();
    // console.log('USER',userId, typeof userId)
   
    // useEffect(()=>{
    //         dispatch(getOrdersByUserId('105677628845670307410'));
    // },[])

    // useEffect(()=>{
    //         dispatch(getOrderById(orderId));
    // },[orderId])

    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items));
    },[items])
    
    console.log('PRODUCT', items)

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
      }
    
    function handleClear(){
        dispatch(clear())
    }

    function handlePayment(){
        if (isAuthenticated) {
            let order= items?.map(item => {
                return {
                    title: item.title,
                    quantity: item.amount,
                    size: item.size,
                    unit_price: item.price
                }
            })
            dispatch(createPayment(order))
            console.log(paymentData)
            setFlag(true)
        } else loginWithPopup()
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
                                return <CartItem  it={it} key={it.index}  className={Style.cartCard}/>      
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
                            <Link to='/catalogue'>
                                <button>Go back shopping</button>
                            </Link>
                            {
                                flag ? 
                            <a target='_blank' href={paymentData?.response?.init_point} rel='nofollow'>Mercadopago</a>    
                                : 
                            items.length >0&&<button onClick={handlePayment}>Go to pay</button>
                            }
                            {items.length >0&&<button onClick={handleClear}>Clear cart</button>}
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