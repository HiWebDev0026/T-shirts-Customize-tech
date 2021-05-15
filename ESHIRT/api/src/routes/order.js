const {Router}= require('express')
const {postOrder, getOrder, getOrders, putOrder}= require('../controllers/order')
const router= Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/:id', postOrder)
router.put('/:id', putOrder)

module.exports= router