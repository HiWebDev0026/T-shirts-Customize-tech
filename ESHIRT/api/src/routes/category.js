const {Router}= require('express')
const {postCategory, getCategories}= require('../controllers/category')
const router= Router()

router.get('/', getCategories )
router.post('/', postCategory)
router.put('', )
router.delete('', )

module.exports = router;