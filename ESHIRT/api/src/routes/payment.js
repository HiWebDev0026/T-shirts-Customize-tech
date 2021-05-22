const {Router}= require('express')
const { postPayment, getPayment, createPayment}= require('../controllers/payment')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();

function checkSatus(req, res, next){
    let {payment_id, status, payment_type}= req.query

}

router.get('/feedback/:id', postPayment)
router.post('/', createPayment)

module.exports = router