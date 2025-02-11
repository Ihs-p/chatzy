import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';


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

export { protectedRoute };
