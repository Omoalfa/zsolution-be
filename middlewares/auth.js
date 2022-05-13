import { verifyToken } from "../helpers/jwt";
import User from "../models/User";

const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    console.log(authorization)
    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'Unathorized request',
            success: false
        })
    }

    const token = authorization.split(' ')[1];
    
    try {
        const { email, _id } = verifyToken(token);

        const user = await User.findOne({ email, _id });

        if (!user) return res.status(401).json({
            message: 'Unathorized request',
            success: false
        })

        req.user = user;
        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
}

export default isAuth;
