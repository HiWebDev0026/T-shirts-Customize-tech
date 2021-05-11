const initialState={
    items: [],
    amount: {}
}

const cartReducer = (state=initialState, action) => {
    switch (action.type){
        case 'GET_ITEMS':
            return state.items

        case 'PUSH_ITEM':
            let alreadyIn= action.payload.id
            state.items.map(item => {
                if (item.id === alreadyIn){
                    return {
                        ...state,
                        amount: {
                            ...state.amount,
                            [alreadyIn]: [alreadyIn]+1
                        }
                    }
                }
            })
            return {
                ...state,
                items: [...state.items, action.payload],
                amount: {
                    ...state.amount,
                    [alreadyIn]: 1}
            }

        case 'DELETE_ITEM':
            let deleted= state.filter(i => i.id !== action.payload)
            return {
                ...state,
                items: deleted
            }

        default: return state
    }
}

export default cartReducer;