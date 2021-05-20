const initialState={
    paymentData:{}
}

const paymentReducer= (state= initialState, action) => {
    switch(action.type){
        
        case 'CREATE_PAYMENT':
            return {
                ...state,
                paymentData: action.payload
            }
        
        default: return state
    }
}

export default paymentReducer