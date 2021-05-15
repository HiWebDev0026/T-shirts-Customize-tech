const {Router}= require('express')
const {postShirt, getShirts, getShirt, putShirt, deleteShirt}= require('../controllers/shirt')
const {postReview, getReviews} = require('../controllers/review.js')
const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();


router.get('/', getShirts)
router.get('/:id', getShirt)
router.post('/', checkJwt, postShirt)
router.put('/:id', checkJwt, putShirt)
router.delete('/:id', checkJwt, deleteShirt)
router.post('/:id/review', postReview)
router.get('/:id/review', getReviews)

module.exports = router