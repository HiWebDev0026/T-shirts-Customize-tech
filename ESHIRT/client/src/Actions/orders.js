import axios from 'axios';

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
            const cloned = [...cart]
            const order = cloned.map(detail => {
                return {
                    shirtId: detail.id,
                    price: detail.price,
                    size: detail.size,
                    amount: detail.amount
                }
            })
            const res = await axios.post(`/order/${userId}`, order, {headers: {
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
            dispatch({type: 'SET_POST_STARTED'})
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
            const order = cart.map(detail => {
                return {
                    shirtId: detail.id,
                    price: detail.price,
                    size: detail.size,
                    amount: detail.amount
                }
            })
            const res = await axios.put(`/order/${orderId}`, order, {headers: {
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
    return function (dispatch) {
        return dispatch({type: 'RESET_PUT_ORDER_OK'})
    }
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

export function checkLastOrder (userId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/order/user/${userId}`, {responseType: 'json'})
            const orders = res.data
            if (orders.length === 0) {
                dispatch({type: 'CHECK_LAST_ORDER', payload: 0})    
            } else {
                const oldOrders = orders.map(order => {
                    if (order.status.toUpperCase() === 'CART') {
                        return Number(order.id)
                    }
                })
                const oldOrder = Math.max(...oldOrders)
                dispatch({type: 'CHECK_LAST_ORDER', payload: (oldOrder && oldOrder) || 0})
            }

        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }    
}

export function setPostStarted () {
    return function(dispatch) {
        return dispatch({type: 'SET_POST_STARTED'}) 
    }
    
}