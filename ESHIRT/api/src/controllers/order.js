const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Shirt, User, Detail, Category, Order} = require('../db.js');


function setTotalPrice (body) {
    let total_price = 0;
    for (const detail of body) {
        total_price += parseInt(detail.price);
    }
    return total_price;
}

function validateOrder (body) {
    if (!Array.isArray(body)) {throw {status: 400, message: 'Body is not an Array'}}

    body.forEach((detail, ix) => {
        if (!detail.shirtId) {throw {status: 400, message: "Shirt id is missing in order at index " + ix}}
        if (!detail.size) {throw {status: 400, message: "Size is missing in order at index " + ix}}
        if (!detail.amount) {throw {status: 400, message: "Amount is missing in order at index " + ix}}
        if (!detail.price) {throw {status: 400, message: "Price is missing in order at index " + ix}}
    })
}

async function postOrder (req, res, next) {
    const userId = req.params.id
    const body = req.body
    try {
        if (userId !== 'unlogged') {
            const user = await User.findOne({where: {id: userId}})
            if (!user) { throw {status: 404, message: 'User not found'}}
        }
        
        validateOrder(body)

        const total_price = setTotalPrice(body)
        if (total_price < 0) {throw {status: 400, message: 'Price should be greater than 0'}}

        const postedOrder = await Order.create({status: 'CART', total_price, userId: ((userId !== 'unlogged' && userId) || null)})
        
        try {
            for (const detail of body) {
                if (detail.id) {
                    detail.shirtId = detail.id
                    delete detail.id
                }
                detail.orderId = postedOrder.id
                
                await Detail.create(detail)
            }    
        } catch (err){
            throw {status: 400, message: 'Error posting detail table. Make sure that shirtId exists'}
        }

        
        return res.status(200).json(postedOrder)
        
    } catch (err) {
        next(err)
    }
}

async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAll({include: [Detail]})
        return res.status(200).json(orders)
    } catch (err) {
        console.log(err)
        return next({status: 500, message: 'Request could not be solved'})
    }
}

async function getOrder (req, res, next) {
    const id = req.params.id
    try { 
        const order = await Order.findOne({where: {id: id}, include: [Detail]})
        if (order) {
            return res.status(200).json(order)
        } else {
            return next({status: 404, message: 'Order not found'})
        }
        
    } catch (error) {
        next({status: 400, message: 'Bad Id format'});
    }
}

module.exports = {
    postOrder,
    getOrders,
    getOrder
}