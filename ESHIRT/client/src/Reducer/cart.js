const initialState={
    items: [],
    amount: {}
}

const cartReducer = (state=initialState, action) => {
    switch (action.type){
        
        case 'PUSH_ITEM':
            let flag= false
            let alreadyIn= action.payload.id
            state.items.forEach(item => {
                if (item.id === alreadyIn){
                    flag= true
                    let value= state.amount[item.id]
                    console.log(value)
                    let auxItems= state.items
                    let auxAmount= state.amount
                    auxAmount[alreadyIn]+=1 
                    return {auxItems, auxAmount}
                }
            })
            if (!flag){
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    amount: {
                        [alreadyIn]: 1
                    }
                }
            }
            

        case 'DELETE_ITEM':
            let deleted= state.items.filter(i => i.id !== action.payload)
            delete state.amount[action.payload]
            return {
                ...state,
                items: deleted,
            }

        default: return state
    }
}

export default cartReducer;