const {Router}= require('express')
const {getAllReviews} = require('../controllers/review.js')
const router= Router();

router.get('/', getAllReviews)

module.exports = router