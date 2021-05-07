const {Router}= require('express')
const {postShirt, getShirts, getShirt, putShirt, deleteShirt}= require('../controllers/shirt')
const router= Router()

router.get('/', getShirts)
router.get('/:id', getShirt)
router.post('/', postShirt)
router.put('/:id', putShirt)
router.delete('/:id', deleteShirt)

module.exports = router