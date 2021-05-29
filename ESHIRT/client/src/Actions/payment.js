import axios from "axios"

export function createPayment({order, shipments, userId, email}){
    return async (dispatch) => {
        const resGetOrder = await axios.get(`/order/user/${userId}`, {responseType: 'json'})
        const Asc = (a, b) => { return parseInt(b.id) - parseInt(a.id) }
        const orderId = resGetOrder.data.sort(Asc)[0].id
        console.log(orderId)
        order= {
            items:order,
            shipments,
            back_urls: {
                "success": `http://localhost:3000/home`,
                "failure": `http://localhost:3000/home`,
                "pending": `http://localhost:3000/home`
            },
            payer:{
                identification:{
                    number: JSON.stringify(orderId)
                }
            },
            auto_return: 'approved',
            metadata: {
                id: JSON.stringify(orderId),
                email: email
            },
            
        }
        try {
            let response= await axios({
                    method: 'post',
                    url: '/payment',                 
                    data: order
            })
            console.log(response)
            dispatch({type: 'CREATE_PAYMENT', payload: response.data})
        }
        catch (error){
            console.log(error)
        }
    }
}