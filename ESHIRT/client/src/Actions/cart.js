import axios from 'axios'

export function pushItem(item){
    return (dispatch) => {
        dispatch({type: 'PUSH_ITEM', payload: item})
    }
}

export function deleteItem(index){
    return (dispatch) => {
        dispatch({type: 'DELETE_ITEM', payload: index})
    }
}

export function addOne(index){
    
    return (dispatch) => {
        dispatch({type: 'ADD_ONE', payload: index})
    }
}

export function outOne(index){
    return (dispatch) => {
        dispatch({type: 'OUT_ONE', payload: index})
    }
}

export function changeSize(item){
    return (dispatch) => {
        dispatch({type: 'CHANGE_SIZE', payload: item})
    }
}

export function clear(){
    return (dispatch) => {
        dispatch({type: 'CLEAR'})
    }
}


/*************************** API - ACTIONS *****************************/

export function postOrder(cart, userId) {
    // ATENCION DANI Y EMA
    // RECIBO EL CARRITO COMO ARRAY DE OBJETOS Y EL USER ID
    // CADA OBJETO POR DENTRO TIENE QUE TENER
    // {
    //    "shirtId": <id de la remera>,
    //    "price": <precio por unidad>,
    //    "amount": <cantidad de productos>,
    //    "size": <talle en mayuscula>
    //} 
    //
    // EL USER ID VA A LA URL COMO PARAMS (ya lo dejé seteado)
    return async (dispatch) => {
        try {
            const res = await axios.post(`/order/${userId}`, cart, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            const newOrder = res.data
            // AHORA DISPONEMOS DEL ID DE LA ORDEN!
            // Y LO VAMOS A NECESITAR PARA IR ACTUALIZANDO EL CARRITO EN LA DB
            // 
            dispatch({type: 'POST_ORDER', payload: {orderId: newOrder.id}})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }

}

export function putOrder (cart, orderId) {
    // ESTE METODO RENUEVA EL CARRITO EN LA BASE DE DATOS
    // SE ENVIA EL CARRITO ENTERO IGUAL Q EN EL POST
    // HAY QUE PASARLE EL orderId EN LA URL (O SEA ID DE LA ORDEN QUE NOS HABIA LLEGADO EN EL POST)
    // EL CARRITO SE INICIA CON STATUS: CART (PRODUCTOS EN EL CARRITO...)
    return async (dispatch) => {
        try {
            const res = await axios.put(`/order/${orderId}`, cart, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            dispatch({type: 'PUT_ORDER'})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }

}

export function modifyOrderStatus (status, orderId) {
    // ESTA FUNCION MODIFICA EL STATUS DEL PEDIDO
    // status TIENE QUE SER UN OBJETO QUE CONTENGA
    // {status: 'PENDING'} pending o el estado correspondiente!
    // CON ALGUNO DE LOS SIGUIENTES VALORES:
    //    'CART', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED'
    // (si quieren cambiar estos valores vayan al modelo de order y cambien las opciones)
    // SI EL ESTADO ORIGINAL ES DONE O CANCELED, 
    // VA A DEVOLVER UN ERROR AVISANDO QUE ESE PEDIDO YA ESTA DADO DE BAJA
    return async (dispatch) => {
        try {
            const res = await axios.put(`/order/status/${orderId}`, status, {headers: {
                Authorization: `Bearer ${localStorage.currentToken}`
            }})
            dispatch({type: 'PUT_ORDER_STATUS'})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})

        }
    }

}

export function resetPutOrderOk () {
    return {type: 'RESET_PUT_ORDER_OK'}
}

export function getOrderById (orderId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/order/${orderId}`, {responseType: 'json'})
            const order = res.data
            dispatch({type: 'GET_ORDER', payload: order})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }   
}

export function getOrdersByUserId (userId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/order/user/${userId}`, {responseType: 'json'})
            const orders = res.data
            dispatch({type: 'GET_ORDERS_BY_USER', payload: orders})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}

export function getOrders () {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/order`, {responseType: 'json'})
            const orders = res.data
            dispatch({type: 'GET_ORDERS', payload: orders})
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }
}