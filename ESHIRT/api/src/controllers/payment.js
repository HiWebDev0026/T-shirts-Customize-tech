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
    let response= await mercadopago.preferences.create(order)
    res.send(response)
    
}

async function getPayment(req, res){
    res.send({
		data: req.body
	})
}

async function postTest(req, res){
    let response= await axios.post("https://api.mercadopago.com/users/test_user", { 
            headers: {
                'Authorization': 'Bearer TEST-2227013032753070-051817-2feef739fe7c323a328a34884afd3072-214410275',
                'Content-Type': 'application/json'
            },
            data: {site_id:"MLA"}
    })
    res.send(response.response)
}

module.exports={
    createPayment,
    postTest,
    getPayment
}