const {Router}= require('express')
const {postOrder, getOrder}= require('../controllers/order')
const router= Router()

router.get('/:id', getOrder)
router.post('/:id', postOrder)


module.exports= router