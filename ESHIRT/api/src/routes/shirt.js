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


/* 

1) ADMIN CAN DELETE, EDIT AND POST SHIRTS EVERYWHERE, FROM ANYONE. OK.

2) WE SHOULD VALIDATE THE FOLLOWING: IF A LOGGED USER (NOT ADMIN) WANTS TO DELETE OR EDIT A SHIRT, HE SHOULD
ONLY DELETE HIS OWN SHIRTS. RIGHT NOW, CROSS USERS CAN DELETE OTHERS' USER SHIRT
BY ACCESSING /DELETE ROUTE.


*/

module.exports = router