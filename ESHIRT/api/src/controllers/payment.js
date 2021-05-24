const mercadopago= require('mercadopago')
const {ACCESS_TOKEN, PUBLIC_KEY}= process.env
const axios= require('axios');
const { getReviews } = require('./review');
const { getMaxListeners, put } = require('../app');
const { Order }= require('../db')

async function createPayment(req, res, next){
    try {
    let order= req.body
    console.log(order)
    let mpResponse= await mercadopago.preferences.create(order)
    console.log(order.payer.identification.number)
    let modify= await Order.findOne({
        where: {
            id: parseInt(order.payer.identification.number) // Esto es el orderID
        }
    })
    console.log(mpResponse)
    modify.paymentId= mpResponse.response.id // Esto es el id del payment
    await modify.save()
    res.status(200).json(mpResponse)
    }
    catch(error){next({status: 500, message: error})}
}

async function getPayment(req, res){
    try {
        let id= req.params.id
        let response= await mercadopago.get(`/v1/payments/search`, {"payment_id":id})
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