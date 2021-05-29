const {Router}= require('express')
const {sendEmail}= require('../controllers/email')
const router= Router()

router.post('/', sendEmail)

module.exports = router