import axios from "axios"

export function createPayment(order, shipments, payer){
    return async (dispatch) => {
        order= {
            items:order,
            shipments,
            back_urls: {
                "success": `http://localhost:3001/payment/feedback/${payer}`,
                "failure": `http://localhost:3001/payment/feedback/${payer}`,
                "pending": `http://localhost:3001/payment/feedback/${payer}`
            },
            auto_return: 'approved'
        }
        try {
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