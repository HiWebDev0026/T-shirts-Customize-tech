import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {} from '../../Actions/cart.js'
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';


import CartItem from './CartItem.jsx'
import Style from './Cart.module.css'

export default function Cart (){

    let items= [
        {
            name: 'Dani',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'S',
            id: 12323,
            price: 30,
            amount:1
        }
        ,
        {
            name: 'Ema',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'XL',
            id: 87879,
            price: 35,
            amount:2
        },
        {
            name: 'Ger',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'L',
            id: 263625365,
            price: 40,
            amount:3
        },
        {
            name: 'Eze',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 895868975,
            price: 30,
            amount:1
        },
        {
            name: 'Javi',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 8787887709,
            price: 35,
            amount:2
        },
        {
            name: 'Lean',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 7978878,
            price: 40,
            amount:3
        },
        {
            name: 'Agus',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 66666655,
            price: 40,
            amount:3
        }
    ]
    
    const cartFromLocalStorage=JSON.parse(localStorage.getItem('items') || '[]'); 
    // console.log('LOCASTORAGE',cartFromLocalStorage);

    // let cartFromLocalStorage2 =cartFromLocalStorage.map(c=> 
    //     {return {
    //         id: c.id,
    //         size: c.size,
    //         amount: c.amount,
    //         price: c.price
    //     }})
    //     console.log('LOCASTORAGE2',cartFromLocalStorage2);

    const [products,setProducts]=useState(cartFromLocalStorage);
    const [currentPage, setCurrentPage] = useState(0);

    const  dispatch= useDispatch();
    // const items = useSelector((state)=>state.cartReducer.items);
    
    const INITIAL_PAGE= 4;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(products.length / INITIAL_PAGE);

    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items));
    },[items]);

    useEffect(()=>{
        let copy= items.slice();
        setProducts(copy);
        console.log('COPY',copy);
        console.log('PROD',products);
    },[]);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
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
                            products.length>0?
                            products.slice(offset, offset + INITIAL_PAGE).map(it=>{
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
                        products.length === 0? 
                        <div>Your cart is empty</div>
                        :<div>You have {products.length} items in your shopping cart</div>
                    }</div>
                    <div>${products.reduce((a,c)=>a+c.price*c.amount,0)}</div>
                    <Link to='/catalogue'>
                        <button>Go back shopping</button>
                    </Link>
                    {products.length >0&&<button>Purchase</button>}
                    
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