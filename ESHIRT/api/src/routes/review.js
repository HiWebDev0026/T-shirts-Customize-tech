const {Router}= require('express')
const {getAllReviews, deleteReview} = require('../controllers/review.js')
const router= Router();

router.get('/', getAllReviews)
router.delete('/:id', deleteReview)

module.exports = router