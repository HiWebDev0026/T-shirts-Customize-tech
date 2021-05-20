import axios from "axios"

export function createPayment(order){
    return async (dispatch) => {
        order= {
            items:order,
            back_urls: {
                "success": "http://localhost:3001/payment/feedback",
                "failure": "http://localhost:3001/payment/feedback",
                "pending": "http://localhost:3001/payment/feedback"
            },
            auto_return: 'approved'
        }
        console.log('entre a la action', order)
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