const {Router}= require('express');
const {getFavorites,postFavorites,deleteFavorites}= require('../controllers/favorites');
// const checkJwt = require('../middlewares/authz/checkJwt');
const router= Router();

router.get('/:userId', getFavorites);
router.post('/:userId', postFavorites);
// router.delete('/:userId', checkJwt, deleteFavorites);

module.exports = router

