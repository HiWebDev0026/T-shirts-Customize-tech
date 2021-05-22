const {Router}= require('express')
const { postPayment, getPayment, createPayment}= require('../controllers/payment')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();

router.get('/feedback/:id', postPayment)
router.get('/:id', getPayment)
router.post('/', createPayment)

module.exports = router