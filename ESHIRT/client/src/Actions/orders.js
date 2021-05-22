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
    return async (dispatch) => {
        try {
            const resGet = await axios.get(`/order/user/${userId}`, {responseType: 'json'})
            if (resGet.data.length > 0) {
                console.log(resGet.data);
                dispatch({type: 'CHECK_LAST_ORDER', payload: resGet.data.id})
            } else {
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
                dispatch({type: 'POST_ORDER', payload: {orderId: newOrder.id}})
            }
        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
            dispatch({type: 'SET_POST_STARTED'})
        }
    }

}

export function putOrder (cart, orderId, operation) {
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
            const res = await axios.put(`/order/${orderId}?operation=${operation}`, order, {headers: {
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

                dispatch({type: 'CHECK_LAST_ORDER', payload: oldOrder || 0})
                
                if (oldOrder > 0) {
                    const addToCart = orders.find(order => (parseInt(order.id) === oldOrder))
                    dispatch({type: 'LOAD_CART_FROM_BACK', payload: addToCart.details})
                }
            }

        } catch (err) {
            console.log((err.response && err.response.data) || 'Server not working!');
            dispatch({type: 'CHECK_LAST_ORDER', payload: 0})

            //dispatch({type: 'HANDLE_REQUEST_ERROR', payload: (err.response && err.response.data) || {status: 500, message: 'Server problem'}})
        }
    }    
}

export function setPostStarted () {
    return function(dispatch) {
        return dispatch({type: 'SET_POST_STARTED'}) 
    }
    
}