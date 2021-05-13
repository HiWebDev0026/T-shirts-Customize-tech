const initialState={
    items: []
}

const cartReducer = (state=initialState, action) => {
    switch (action.type){
        
        case 'PUSH_ITEM':
            let flag= false
            state.items.forEach(item => {
                if (item.id === action.payload.id){
                    flag= true
                }
            })
            if (flag){
                return state
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
            }

        case 'DELETE_ITEM':
            let deleted= state.items.filter(i => i.id !== action.payload)
            return {
                ...state,
                items: deleted,
            }

        case 'ADD_ONE':
            let added= state.items.map(item => {
                if (item.id === action.payload){
                    item.amount += 1
                }
                return item
            })
            console.log(added)
            return {
                ...state,
                items: added
            }
            
        case 'OUT_ONE':
        let aux= []    
        let erased= state.items.map(item => {
                if (item.id === action.payload){
                    item.amount -= 1
                    if (item.amount < 1){
                        aux= state.items.filter(i => i.id === action.payload)
                    }
                    return item
                }
            })
        if (aux.length === 0){
            return {
                ...state,
                items: erased
            }
        } else {
            return {
                ...state,
                items: aux
            }
        }

        case 'CHANGE_SIZE':

        default: return state
    }
}

export default cartReducer;