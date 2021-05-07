const {Router}= require('express')
const {postShirt, getShirts, getShirt}= require('../controllers/shirt')
const router= Router()

router.get('/', getShirts)
router.get('/:id', getShirt)
router.post('/', postShirt)
router.put('/', )
router.delete('/', )

module.exports = router