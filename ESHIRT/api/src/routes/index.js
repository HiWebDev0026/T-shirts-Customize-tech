const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {category}= require('./category')
const {details}= require('./details')
const {order}= require('./order')
const {shirt}= require('./shirt')
const {user}= require('.user')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/category', category)
router.use('/details', details)
router.use('/order', order)
router.use('/shirt', shirt)
router.use('/user', user)

module.exports = router;
