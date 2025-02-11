const { signup, login, logout, updateProfile, checkAuth } = require('../controllers/auth.controller')
const { protectedRoute } = require('../middleware/auth.middleware')

const router = require('express').Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.put('/update-profile',protectedRoute, updateProfile)
router.post('/check',protectedRoute, checkAuth)


module.exports  = router