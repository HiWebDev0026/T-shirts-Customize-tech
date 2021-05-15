const {Router} = require('express')
const {postOrder, getOrder, getOrders, putOrder, modifyStatus, getOrdersByUserId}= require('../controllers/order')
const router = Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/:userId', postOrder)
router.put('/:id', putOrder)
router.put('/status/:id', modifyStatus)
router.get('/user/:userId', getOrdersByUserId)

module.exports = router