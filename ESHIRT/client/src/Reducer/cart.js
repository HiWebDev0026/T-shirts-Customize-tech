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
            delete state.amount[action.payload]
            return {
                ...state,
                items: deleted,
            }

        case 'ADD_ONE':
            let modified= state.items.map(item => {
                if (item.id === action.payload){
                    item.amount += 1
                }
                return item
            })
            console.log(modified)
            return {
                ...state,
                items: modified
            }
            
        case 'OUT_ONE':

        case 'CHANGE_SIZE':

        default: return state
    }
}

export default cartReducer;