const jwt = require("jsonwebtoken")
const User = require("./users.model")


const AuthorizeUser = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];


    if (!bearerToken) {
        return res.status(401).json({
            message: "Authorization failed"
    })
    }

    const TokenArray = bearerToken.split(" ");

    const token = TokenArray[1]

    if (!token) {
        return res.status(401).json({
            message: "Authorization failed"
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authorization failed"
        })
    }
    
};

module.exports = {
    AuthorizeUser
}