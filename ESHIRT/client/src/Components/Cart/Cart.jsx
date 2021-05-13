import React,{useEffect,useState} from 'react';
// import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";

import Style from './Cart.module.css'

export default function Cart (){
    //1re parte:
        //cart vendría siendo el array del carrito
        // const [cart,setCart]=useState([]);
        //  useEffect(()=>{
        //     LocalStorage.setItem('cart',JSON.stringify(cart));
        // },[cart])
        //ver en la consola Application y en key vería cart como un default empty array
        //cuando añada algo a cart lo voy a ver en el value en Application
    //2da parte:
    //const cartFromLocalStorage= JSON.parse(localStorage.getItem('cart')|| []);
    //el default value es porque si es un usuario puede no estar seteado esto, entonces seria el default el empty array;
    //  cambiamos const [cart,setCart]=useState([]); por const [cart,setCart]=useState(cartFromLocalStorage);
    //Hay un meaximo a almacenar en el local storage (2mb to 10mb) para mas puede usarse cookies

    let items= [
        {
            name: 'Dani',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'S',
            id: 12323,
            price: 30,
            quantity:1
        },
        {
            name: 'Ema',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'XL',
            id: 87879,
            price: 35,
            quantity:2
        },
        {
            name: 'Ger',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'L',
            id: 263625365,
            price: 40,
            quantity:3
        },
        {
            name: 'Eze',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 895868975,
            price: 30,
            quantity:1
        },
        {
            name: 'Javi',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 8787887709,
            price: 35,
            quantity:2
        },
        {
            name: 'Lean',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 7978878,
            price: 40,
            quantity:3
        },
        {
            name: 'Agus',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            id: 66666655,
            price: 40,
            quantity:3
        }]
    
    const [products,setProducts]=useState([]);
    const [remove,setRemove]=useState(false);
    // const [edit,setEdit]=useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    // const [input,setInput] =useState(it.quantity)

    let sizes=['S','M','L','XL']    
    const INITIAL_PAGE= 4;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(products.length / INITIAL_PAGE);

   

    useEffect(()=>{
        setProducts(items);
        console.log('PRODUCTS',products);
    },[]);

   


    function handleDelete(e){
        let id=e.currentTarget.value;
        console.log('ID',id);
        const cartItems= products.slice();
        // setState({cartItems:cartItems.filter(i=>i.d !==item.id)});
        //setStatus es el global y cartItems: es para un estado global que es cartitems: [];
        //lo que viene es mientras tanto
        console.log('CARTITEMS',cartItems);
        let copy= cartItems.filter(item=>item.id != id);
        console.log('COPY',copy);
        setProducts(copy);
        setRemove(!remove);
    }

    // function handleEdit(e) {
    //     let id=e.currentTarget.value;
    //     console.log('IDEDIT',id);
    //     const cartItems= products.slice();
    //     let index= cartItems.findIndex(item=>item.id == id);
    //     console.log('Index',index);
    //     products[index].size='L';
    //     console.log('SIZE',products[index].size);
    //     setEdit(!edit);
    // }

    // function onChangeHandler(e){
    //     setInput(e.target.value);

    // }

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
                                return <li key={it.id} className={Style.cartCard}> 
                                            <div className={Style.picture}>
                                                <img src={it.print} alt={'product'+ it.id} className={Style.image}/>
                                            </div>
                                            <div className={Style.column1}>
                                                <div className={Style.detail}>
                                                    <div className={Style.name}>{it.name}</div>
                                                    <div className={Style.sku}>SKU:{it.id}</div>
                                                </div>
                                                <div className={Style.btns}>
                                                        <button value={it.id} onClick={handleDelete}><BsFillTrashFill/></button>
                                                        <button><BsFillHeartFill/></button>
                                                        {/* <Link to='/design'> */}
                                                            <button><FaEdit/></button>
                                                        {/* </Link> */}
                                                 
                                                </div>
                                            </div>
                                            <div className={Style.column2}>
                                                <div className={Style.price}>${it.price}</div>
                                            </div>
                                            <div className={Style.column3}>
                                                <div className={Style.size}>
                                                    <select name='size' id='size' required>
                                                        {
                                                            sizes.map((s)=>{
                                                                return it.size === s?
                                                                  <option value={s} selected>{s}</option>
                                                                : <option value={s}>{s}</option>
                                                            })  
                                                        }
                                                    </select>
                                                </div>
                                                <div className={Style.quantity}>
                                                    <input type="number"  min="1" max="10"  className={Style.q}/>
                                                </div>
                                            </div>
                                        </li>
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
                    <div>${products.reduce((a,c)=>a+c.price*c.quantity,0)}</div>
                    <button>Go back shopping</button>
                    <button>Purchase</button>
                    
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