const {Router}= require('express')
const {postShirt, getShirts, getShirt, putShirt, deleteShirt}= require('../controllers/shirt')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();



router.get('/', getShirts)
router.get('/:id', getShirt)
router.post('/', checkJwt, postShirt)
router.put('/:id', checkJwt, putShirt)
router.delete('/:id', checkJwt, deleteShirt)

module.exports = router