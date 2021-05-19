const { Router } = require('express');

const category = require('./category')
const details = require('./details')
const order = require('./order')
const shirt = require('./shirt')
const user = require('./user')
const favorites = require('./favorites')

const router = Router();

router.use('/category', category)
router.use('/details', details)
router.use('/order', order)
router.use('/shirt', shirt)
router.use('/user', user)
router.use('/favorites', favorites)

module.exports = router;
