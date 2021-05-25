const mercadopago= require('mercadopago')
const {ACCESS_TOKEN, PUBLIC_KEY}= process.env
const axios= require('axios');
const { getReviews } = require('./review');
const { getMaxListeners, put } = require('../app');
const { Order }= require('../db')

async function createPayment(req, res, next){
    try {
    let order= req.body
    
    // let orders= await Order.findAll({
    //     where: {
    //         userId: order.payer.identification.number, // Esto es el orderID
    //     }
    // })

    // const mappedOrders = orders.filter(o => o.dataValues.status === 'CART')
    // console.log(mappedOrders, 'FJDSKLFJDSLKFJKLSDFJLKDSJFLKDSJFLSDJFLKSDJFKLJSDLKF')
    // x = mappedOrders
    // let max = x[0].dataValues.id;
    // for (let i=0; i< x.length ; i++) {
    //     for (let j=i+1; j < x.length; j++) {
    //         if(max < x[j].dataValues.id) {
    //             max = x[j].dataValues.id
    //         }
    //     }
    // }

    const orderId = parseInt(order.payer.identification.number)
    const orderToModify = await Order.findOne({where: {id: orderId}})
    let mpResponse= await mercadopago.preferences.create(order)
    console.log(mpResponse)
    orderToModify.paymentId= mpResponse.response.id // Esto es el id del payment
    await orderToModify.save()
    res.status(200).json(mpResponse)
    }
    catch(error){next({status: 500, message: error})}
}

async function getPayment(req, res){
    try {
        let id= req.params.id
        let response= await mercadopago.get(`/v1/payments/search`, {"external_reference":id})
        res.json(response)
    }
    catch(error){}

}

async function postPayment(req, res){
    try {
        let {payment_id, status, payment_type}= req.query
        let userId= req.params.id
        let response= await axios({
            method: 'put',
            url: `http://localhost:3001/order/status/${userId}`,
            data: {
                status,
                payment_type,
                payment_id
            }    
        })
        res.send(response)
    }
    catch(error){}
}




module.exports={
    createPayment,
    getPayment,
    postPayment
}