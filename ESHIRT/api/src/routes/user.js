const {Router}= require('express')
const {postUser, getUser, getUsers, putUser, deleteUser}= require('../controllers/user')
const checkAdminScopes = require('../middlewares/authz/checkScopes');
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router()

router.get('/', checkJwt, checkAdminScopes, getUsers)
router.get('/:id', checkJwt, getUser)
router.post('/', postUser)
router.put('/:id', checkJwt, putUser)
router.delete('/:id', checkJwt, checkAdminScopes, deleteUser)


module.exports= router