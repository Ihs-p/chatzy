const { getMessages, getUsersForSidebar, sendMessage } = require('../controllers/message.controller')
const { protectedRoute } = require('../middleware/auth.middleware')

const router = require('express').Router()


router.get('/users',protectedRoute, getUsersForSidebar)
router.get('/:id',protectedRoute, getMessages)
router.post('/send/:id',protectedRoute, sendMessage)




module.exports  = router