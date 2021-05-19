const {Router}= require('express')
const { postTest, createItem, getPayment, createPayment}= require('../controllers/payment')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();

router.get('/', postTest)
router.get('/feedback', getPayment)
router.post('/', createPayment)

module.exports = router