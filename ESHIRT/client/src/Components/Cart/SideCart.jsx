import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import swal from 'sweetalert';
import {ReactComponent as CartIconDeploy} from '../../assets/879764.svg'
import {ReactComponent as EmptyCart} from '../../assets/102661.svg'
import {ReactComponent as RemoveAllIcon} from '../../assets/bin_cart.svg'
import {ReactComponent as ConfirmCheckout} from '../../assets/1828391.svg'
import {ReactComponent as AddOne} from '../../assets/1828919.svg';
import {ReactComponent as SubstractOne} from '../../assets/261988.svg';
import {ReactComponent as HeartFavorite} from '../../assets/2107845.svg';
import {ReactComponent as CloseCart} from '../../assets/1828666.svg';
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';

import { BsFillHeartFill } from 'react-icons/bs';

import { 
    putOrder,
    setCartItems,
    checkLastOrder,
    postOrder,
    postFavorite
} from '../../Actions/index';
import style from './SideCart.module.css'


export function SideCart({closeCart}){ 
    
    const dispatch= useDispatch()

    const items= useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const {isAuthenticated, user, loginWithPopup} = useAuth0();
    const shirts = useSelector((state)=>state.shirtReducer.allShirts);
    let total= items.length > 0 && items?.map((elem)=>{
            
        return elem.price*elem.amount;
    })?.reduce((acc, actual) => acc+actual)
    
    const handleCartChange = (e, operation) => {
        e.preventDefault();
        const item = (e.target.id && items[parseInt(e.target.id)]) || {}
        let auxOperation = null
        if (orderId > 0) {
            if (operation === '+') {
                auxOperation = 'add'
            } else if (operation === '-') {
                auxOperation = 'remove'
            } else {
                auxOperation = 'clear'
            }
            dispatch(putOrder([...items.map(i => { return {...i}}), {...item, amount: 1}], orderId, auxOperation))
        } else if (orderId === 0) {
            // alert(orderId)
            dispatch(postOrder([...items, item], user.sub.split('|')[1]))
        }
        dispatch(setCartItems({ 
            ...item, 
            amount: 1
        }, operation));
    }

    const showProceed = () => {
        return (
            <NavLink to={'/cart'} onClick={()=> closeCart(false)}>
                <button className={style.cartBtnP}><ConfirmCheckout style={isAuthenticated ? {fill: 'green'} : {fill: 'black'}}/><span>CHECKOUT</span></button>
            </NavLink>
        )
    }

    const showLogAndProceed = (loginWithPopup) => {

        return (
            <div>
                <button className={style.cartBtnP} onClick={loginWithPopup}><ConfirmCheckout/><span>CHECKOUT</span></button>
            </div>
        )
    }

    const handleFavorite =(e, id) => {
        e.preventDefault();
        if(isAuthenticated){
            dispatch(postFavorite(user.sub.split('|')[1],{shirtId:id}));
            swal({title:'added to favorites', icon:'success', timer:3000});
        }else{
            loginWithPopup();
        }
    }

    useEffect(()=> {
        if (isAuthenticated) {
            dispatch(checkLastOrder(user.sub.split('|')[1]))
        }     
    }, [isAuthenticated])


    return (
        <div className={style.containerSideCart}>
            <div className={style.cartIconDeploy}>
                <CartIconDeploy />
                <div className={style.cartTotalContainer}>
                    <div>
                        <h2>{items.reduce((a,c)=>a+c.amount,0)} ITEMS</h2>
                    </div>
                    <div className={style.total}>
                        <h2>US$ {total || 0}</h2>
                    </div>
                </div>
            </div>
            <div className={style.items}>
                
                
                
                <div className={style.btnPanelContainer}>
                    
                        <button className={style.cartBtnC}  onClick={(e) => handleCartChange(e, 'clear')} ><RemoveAllIcon /><span>CLEAR CART</span></button>
                        {isAuthenticated ? showProceed() : showLogAndProceed(loginWithPopup)}
                        <button className={style.cartBtnClose}  onClick={(e) => closeCart(false)} ><CloseCart /><span>CLOSE CART</span></button>
                        
                    
                </div>
                {items?.map((item, index)=> {
                    let shirt ={}
                    if(!item.hasOwnProperty('image')){
                        shirt = shirts.find(shirt=> shirt.id === item.id)
                        item.image = shirt?.print || 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bf76.png';
                    }
                    
                    return(
                        
                        <div key={index*35} className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                US$ {item.price}x{item.amount}
                                <div className={style.addToFav} onClick={(e) =>handleFavorite(e, item.id)} ><button className={isAuthenticated?style.blackHeart:style.greyHeart}><BsFillHeartFill/></button><span style={isAuthenticated ? {color: 'red'} : {color: ''}}>ADD TO FAV</span></div>

                            </div>
                            <div className={style.ctrls}>
                                <img src={item.image}/> 
                                <div className={style.amount} style={{display: "flex"}}>
                                    <div style={{position: "relative" }}>
                                        <AddOne style={{fill: '#73BFB8'}}/>
                                        <button 
                                            id={index} 
                                            onClick={(e) => handleCartChange(e, '+')}
                                            style={{
                                                position: "absolute", 
                                                bottom: "20%", 
                                                right: "20%", 
                                                width: "20px", 
                                                height: "20px"
                                                }}
                                            ></button>
                                    </div>
                                    <div style={{position: "relative" }}>
                                        <SubstractOne style={{fill: '#EA7317'}}/>
                                        <button 
                                            id={index} 
                                            onClick={(e) => handleCartChange(e, '-')}
                                            style={{
                                                position: "absolute", 
                                                bottom: "20%", 
                                                right: "20%", 
                                                width: "20px", 
                                                height: "20px"
                                                }}
                                            ></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                    })
                }
                {items.length < 1 && <div className={style.emptyCart}>
                        <EmptyCart />
                        <h3>Your cart is currently empty. Start by choosing a shirt from the catalogue.</h3>
                    </div>}
                     
            </div>
            
            {items.length > 1 && <div className={style.bottomShadowCart}></div>}
        </div>
    )
}
