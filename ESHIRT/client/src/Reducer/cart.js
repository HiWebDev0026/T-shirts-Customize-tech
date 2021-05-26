const initialState={
    items:  JSON.parse(localStorage.getItem('items')) || [],
    hasChecked: false
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

const loadCartFromBack = (cart, items) => {
    if (cart.length === 0) {
        return items.map(item => {
            item.amount = parseInt(item.amount);
            item.id=item.shirtId;
            return item
        })
    }
    const filtered = {};
    
    for (const backItem of items) {
        let key = backItem.size + '_' + backItem.shirtId;
        const importantFields = {}
        importantFields.id = backItem.shirtId 
        importantFields.amount = parseInt(backItem.amount)
        importantFields.size = backItem.size
        importantFields.price = backItem.price
        filtered[key] = importantFields
    }
    for (const cartItem of cart) {
        let key = cartItem.size + '_' + cartItem.id
        filtered[key] = cartItem
    }

    const result = [];

    for (const key in filtered) {
        result.push(filtered[key])
    }

    return result    
}

const cartReducer = (state=initialState, action) => {
    switch (action.type){
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
            case 'LOAD_CART_FROM_BACK': 
                if (!state.hasChecked) {
                    const modifiedCart = loadCartFromBack(state.items, action.payload)
                    modifiedCart && localStorage.setItem('items', JSON.stringify(modifiedCart))
                    return {
                        ...state,
                        items: modifiedCart,
                        hasChecked: true
                    }
                } else {
                    return state
                }   
            
        default: return state
    }
}

export default cartReducer;