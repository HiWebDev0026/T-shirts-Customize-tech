import { v4 as uuidv4 } from 'uuid';

const initialState={
    items:  JSON.parse(localStorage.getItem('items')) || [],
}


const setCartItems = (cart, item, operation) => {
    if (operation === 'clear') {
        return []
    }

    if (cart.length === 0) {
        return (operation === '+' && [...cart, item]) || cart
    }
    
    const foundItem = cart.find(i => (i.id === item.id && i.size === item.size));
    if (!foundItem) { 
        return (operation === '+' && [...cart, item]) || cart
    } else {
        operation === '+' ? foundItem.amount += item.amount : foundItem.amount -= item.amount;
        return cart.filter(i => i.amount > 0)
    }
}

const changeItemSize = (cart, item, index) => {
    const newCart = [...cart];
    newCart[index] = item
    return newCart
}


const cartReducer = (state=initialState, action) => {
    switch (action.type){
        
        case 'PUSH_ITEM':
            let flag= false
            state.items.forEach(item => {
                if (item.id === action.payload.id){
                    if (item.size === action.payload.size){
                        flag= true
                    } 
                }
            })
            if (flag){
                

                return state
            } else {
                action.payload= {
                    ...action.payload,
                    index: uuidv4()
                }
                localStorage.setItem('items', JSON.stringify([...state.items, action.payload]))
                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
            }

        case 'DELETE_ITEM':
            let deleted= state.items.filter(i => i.index !== action.payload)
            localStorage.setItem('items', JSON.stringify(deleted))
            return {
                ...state,
                items: deleted,
            }

        case 'ADD_ONE':
            let added= state.items.map(item => {
                if (item.index === action.payload){
                    item.amount += 1
                }
                return item
            })
            localStorage.setItem('items', JSON.stringify(added))
            return {
                ...state,
                items: added
            }
            
        case 'OUT_ONE':
        let erased= []    
        if (state.items.length === 1){
            if (state.items[0].index === action.payload && state.items[0].amount === 1){
                return {...state, items:[]}
            } 
        }
        let droppedOne= state.items?.map(item => {
                if (item.index === action.payload){
                    if (item.amount === 1){
                        erased= state.items.filter(i => i.index !== action.payload)
                    }
                    item.amount -= 1
                }
                return item
            })
        if (erased.length < 1){
            localStorage.setItem('items', JSON.stringify(droppedOne))
            return {
                ...state,
                items: droppedOne
            }
        } else {
            localStorage.setItem('items', JSON.stringify(erased))
            return {
                ...state,
                items: erased
            }
        }

        case 'CHANGE_SIZE':
            let modified= []
            if (state.items.length < 2){
                if (state.items[0].index === action.payload.index){
                    modified.push(action.payload)
                    console.log(modified)
                    return {
                        ...state,
                        items: modified
                    }
                } else {return state}
            }
            modified= state.items
            modified.forEach(item => {
                if(item.index === action.payload.index){
                    item= action.payload
                }
            })
            console.log(modified)
            return {
                ...state,
                items: modified
            }

            case 'CLEAR':
                localStorage.removeItem('items');
                return {
                    ...state,
                    items: []
                }

            case 'SET_CART_ITEMS':
                const updatedCart = setCartItems(state.items, action.payload.item, action.payload.operation)
                updatedCart && localStorage.setItem('items', JSON.stringify(updatedCart))
                return {
                    ...state,
                    items: updatedCart
                }
            case 'CHANGE_ITEM_SIZE': 
                const updatedSize = changeItemSize(state.items, action.payload.item, action.payload.index);
                updatedSize && localStorage.setItem('items', JSON.stringify(updatedSize))
                return {
                    ...state,
                    items: updatedSize
                }
                
        default: return state
    }
}

export default cartReducer;