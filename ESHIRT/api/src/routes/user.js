const {Router}= require('express')
const {postUser, getUser}= require('../controllers/user')
const router= Router()

router.get('/', )
router.get('/:id', getUser)
router.post('/', postUser)
router.put('/:id', )
router.delete('/:id', )


module.exports= router