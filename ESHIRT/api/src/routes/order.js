const {Router} = require('express')
const {postOrder, getOrder, getOrders, putOrder, modifyStatus, getOrdersByUserId, getOrdersByStatus}= require('../controllers/order')
const checkJwt = require('../middlewares/authz/checkJwt');
const router = Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/:userId', postOrder)
router.put('/:id', putOrder)
router.put('/status/:id', /* checkJwt, */ modifyStatus)
router.get('/user/:userId', getOrdersByUserId)
router.get('/user/status/:userId', getOrdersByStatus)

module.exports = router