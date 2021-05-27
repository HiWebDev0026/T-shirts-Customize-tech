const {Router}= require('express')
const { deletePayment, postPayment, getPayment, createPayment}= require('../controllers/payment')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();

router.get('/feedback/:id', postPayment)
router.get('/', getPayment)
router.post('/', createPayment)
router.delete('/', deletePayment)

module.exports = router

