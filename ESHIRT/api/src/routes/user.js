const {Router}= require('express')
const {postUser, getUser, getUsers, putUser, deleteUser}= require('../controllers/user')
const checkAdminScopes = require('../middlewares/authz/checkScopes');
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router()

<<<<<<< HEAD
router.get('/', checkJwt, getUsers)
=======
router.get('/', checkJwt, checkAdminScopes, getUsers)
>>>>>>> c6772b0a796a98e1927a01d314bc029c35117c31
router.get('/:id', checkJwt, getUser)
router.post('/', postUser)
router.put('/:id', checkJwt, putUser)
router.delete('/:id', checkJwt, checkAdminScopes, deleteUser)


module.exports= router