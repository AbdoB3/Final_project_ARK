const jwt = require('jsonwebtoken')


const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

if (!token) {  
    return res.status(401).send('Login first');
}

const tokenValue = token.slice(7); // Remove 'Bearer ' prefix

try {
    decodedToken = jwt.verify(tokenValue, 'secret_key');
    req.idU= decodedToken.userId;
    next();
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).send('Unauthorized: Token expired');
    }
}
};


  const authorize = (requiredRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        const tokenValue = token.slice(7);

        if (!tokenValue) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(tokenValue, 'secret_key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
           
          
            // Check if user has any of the required roles
            if (!requiredRoles.includes(decoded.role)) {
                return res.status(403).json({ message: `Forbidden: Access Denied for ${decoded.role}` });
            }

            next();
        });
    };
};

  


module.exports = {authenticateUser,authorize};