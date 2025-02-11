const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({
                message: "unauthorized"
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded.userId)
        next()
    } catch (error) {
        res.status(401).json({
            message: "server error"
        })
    }   
}

module.exports = {protectedRoute}
