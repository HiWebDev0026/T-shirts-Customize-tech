const {Router}= require('express')
const {postUser, getUser, getUsers, putUser, deleteUser}= require('../controllers/user')
const router= Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', postUser)
router.put('/:id', putUser )
router.delete('/:id', deleteUser)


module.exports= router