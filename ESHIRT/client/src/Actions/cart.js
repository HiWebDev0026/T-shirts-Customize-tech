import axios from 'axios'

export function pushItem(item){
    return (dispatch) => {
        dispatch({type: 'PUSH_ITEM', payload: item})
    }
}

export function deleteItem(index){
    return (dispatch) => {
        dispatch({type: 'DELETE_ITEM', payload: index})
    }
}

export function addOne(index){
    
    return (dispatch) => {
        dispatch({type: 'ADD_ONE', payload: index})
    }
}

export function outOne(index){
    return (dispatch) => {
        dispatch({type: 'OUT_ONE', payload: index})
    }
}

export function changeSize(item){
    return (dispatch) => {
        dispatch({type: 'CHANGE_SIZE', payload: item})
    }
}

export function clear(){
    return (dispatch) => {
        dispatch({type: 'CLEAR'})
    }
}

export function setCartItems (item, operation) {
    return {type: 'SET_CART_ITEMS', payload: {item, operation}}
}

export function setSizeChanged(item, index) {
    return {type: 'CHANGE_ITEM_SIZE', payload: {item, index}}
}

/*************************** API - ACTIONS *****************************/

