const initialState={
    orders: []
}

const ordersReducer = (state=initialState, action) => {
    switch (action.type){
            case 'GET_ORDERS':{
                return{
                    ...state,
                    orders:action.payload
                }
            }
            case 'POST_ORDER':
            return {
                ...state,
                orderId: action.payload.orderId
            }
            case 'PUT_ORDER':
                return {
                    ...state,
                    putOrderOk: true
            }
            case 'PUT_ORDER_STATUS':
                return {
                    ...state,
                    putOrderOk: true
            }
            case 'RESET_PUT_ORDER_OK':
                return {
                    ...state,
                    putOrderOk: null
            }
            case 'GET_ORDERS_BY_USER':
                let cart=action.payload.filter(item => item.status === 'CART')
                return {
                    ...state,
                    orderId: cart[0].id
            }

            case 'GET_ORDER':{
                return{
                    ...state,
                    items: action.payload.details
                }
            }
            case 'GET_ORDERS':{
                return{
                    ...state,
                    orders:action.payload
                }
            }
        default: return state
    }
}

export default ordersReducer;