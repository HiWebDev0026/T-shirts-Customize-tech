import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';

import Style from './Cart.module.css'

export default function Cart (){

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
    
    let sizes=['S','M','L','XL']    

    const [products,setProducts]=useState([]);
    const [remove,setRemove]=useState(false);

    useEffect(()=>{
        setProducts(items);
        console.log('PRODUCTS',products);
    },[remove]);

    function handleDelete(item){
        const cartItems= items.slice();
        // setState({cartItems:cartItems.filter(i=>i.d !==item.id)});
        //setStatus es el global y cartItems: es para un estado global que es cartitems: []
        ;
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
                            products.map(it=>{
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
                                                    <div>
                                                        <button value={it.id} onClick={handleDelete(it)}><BsFillTrashFill/></button>
                                                    </div>
                                                    <div>
                                                        <button><BsFillHeartFill/></button>
                                                    </div>
                                                    <div>
                                                        <input type='button' value='Edit'/>
                                                    </div>
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
                                                    <input type="number"  min="1" max="10" value={it.quantity} className={Style.q}/>
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
                        :<div>You have {items.length} items in your shopping cart</div>
                    }</div>
                    <div>${items.reduce((a,c)=>a+c.price*c.quantity,0)}</div>
                    <button>Go back shopping</button>
                    <button>Purchase</button>
                    
                </div>
            </div>
                <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
           
                />
        </div>
    )
}