import axios from "axios"

export function createPayment(order, shipments, userId){
    return async (dispatch) => {
        const resGetOrder = await axios.get(`/order/user/status/${userId}`, {responseType: 'json'})
        const orderId = resGetOrder.data
        order= {
            items:order,
            shipments,
            back_urls: {
                "success": `http://localhost:3001/payment/feedback/${orderId}`,
                "failure": `http://localhost:3001/payment/feedback/${orderId}`,
                "pending": `http://localhost:3001/payment/feedback/${orderId}`
            },
            payer:{
                identification:{
                    number: JSON.stringify(orderId)
                }
            },
            auto_return: 'approved',
        }
        try {
            let response= await axios({
                    method: 'post',
                    url: '/payment',                 
                    data: order
            })
            dispatch({type: 'CREATE_PAYMENT', payload: response.data})
        }
        catch (error){
            console.log(error)
        }
    }
}