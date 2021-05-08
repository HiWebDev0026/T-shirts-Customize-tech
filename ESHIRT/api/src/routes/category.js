const {Router}= require('express')
const {postCategory, getCategories, deleteCategory, putCategory}= require('../controllers/category')
const router= Router()

router.get('/', getCategories )
router.post('/', postCategory)
router.put('/:id', putCategory )
router.delete('/:id', deleteCategory )

module.exports = router;