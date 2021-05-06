const {Router}= require('express')
const {postShirt}= require('../controllers/shirt')
const router= Router()

router.get('/', )
router.post('/', postShirt)
router.put('/', )
router.delete('/', )

module.exports= router