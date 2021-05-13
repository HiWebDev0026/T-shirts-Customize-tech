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
        let erased= []    
        if (state.items.length < 2){
            if (state.items[0].id === action.payload && state.items[0].amount === 1){
                return {...state, items:[]}
            }
        }
        let droppedOne= state.items?.map(item => {
                if (item.id === action.payload){
                    if (item.amount === 1){
                        erased= state.items.filter(i => i.id !== action.payload)
                    }
                    item.amount -= 1
                }
                return item
            })
        if (erased.length < 1){
            return {
                ...state,
                items: droppedOne
            }
        } else {
            return {
                ...state,
                items: erased
            }
        }

        case 'CHANGE_SIZE':

        default: return state
    }
}

export default cartReducer;