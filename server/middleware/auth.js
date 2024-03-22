const jwt = require("jsonwebtoken");
const JWT_SECRET='abcd';
const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token.split(' ')[1],JWT_SECRET,(err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token verification failed' });
        }
        req.user = decoded;
        next();
    });
}

module.exports=auth;