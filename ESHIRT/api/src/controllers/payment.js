const mercadopago= require('mercadopago')
const {ACCESS_TOKEN, PUBLIC_KEY}= process.env
const axios= require('axios');
const { getReviews } = require('./review');
const { getMaxListeners } = require('../app');

async function createPayment(req, res){
    
    
                    //HARDCODE FOR TESTING
    /* let order= {
        items: [
            {
                title: 'Agus',
                quantity: 3,
                size: 'L',
                unit_price: 100
            }
        ],
        back_urls: {
			"success": "http://localhost:3001/payment/feedback",
			"failure": "http://localhost:3001/payment/feedback",
			"pending": "http://localhost:3001/payment/feedback"
		},
        payer: {
            email: 'aagenesds1740@gmail.com'
        },
		auto_return: 'approved',
    } */
    
    let order= req.body
    console.log(order)
    let response= await mercadopago.preferences.create(order)
    console.log(response)
    res.send(response)
    
}

async function getPayment(req, res){
    res.send({
		data: req.query
	})
}



module.exports={
    createPayment,
    getPayment
}