const {Router}= require('express')
const {postShirt, getShirts}= require('../controllers/shirt')
const router= Router()

router.get('/', getShirts)
router.post('/', postShirt)
router.put('/', )
router.delete('/', )

module.exports= router