import axios from "axios"

export function createPayment(order, shipments, orderId){
    return async (dispatch) => {
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
            console.log(orderId)
            let response= await axios({
                    method: 'post',
                    url: '/payment',                 
                    data: order
            })
            console.log(response.data)
            dispatch({type: 'CREATE_PAYMENT', payload: response.data})
        }
        catch (error){
            console.log(error)
        }
    }
}