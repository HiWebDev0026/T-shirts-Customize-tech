const {Router}= require('express')
const {postOrder, getOrder, getOrders}= require('../controllers/order')
const router= Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/:id', postOrder)


module.exports= router