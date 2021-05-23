const initialState={
    orders: [],
    orderId: localStorage.getItem('orderId') || null,
    putOrderOk: null,
    postStarted: false,
    lastOrderChecked: false,
    orderDetail: [],
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
                localStorage.setItem('orderId', `${action.payload.orderId}`)
            return {
                ...state,
                orderId: action.payload.orderId,
                postStarted: false
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
                // let cart=action.payload.filter(item => item.status === 'CART')
                /* return {
                    ...state,
                    orderId: cart[0].id
                } */
            const oldOrders = action.payload.map(order => {
                if (order.status.toUpperCase() === 'CART') {
                    return Number(order.id)
                }
            })
            const oldOrder = Math.max(...oldOrders)

            return {
                ...state,
                orderId: oldOrder
            }

            case 'GET_ORDER':{
                return{
                    ...state,
                    orderDetail: action.payload.details
                }
            }
            case 'GET_ORDERS':{
                return{
                    ...state,
                    orders:action.payload
                }
            }
            case 'CHECK_LAST_ORDER': {
                return {
                    ...state,
                    orderId: action.payload,
                    lastOrderChecked: true
                }
            }
            case 'SET_POST_STARTED': {
                return {
                    ...state,
                    postStarted: true
                }
            }
        default: return state
    }
}

export default ordersReducer;