const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {category, details, order, shirt, user}= require('./')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/category', category)
router.use('/details', details)
router.use('/order', order)
router.use('/shirt', shirt)
router.use('/user', user)

module.exports = router;
