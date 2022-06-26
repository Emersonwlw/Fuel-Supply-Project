const jwt = require('jsonwebtoken');

module.exports = (req, res,next)=>{

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.posto = decode;
        next();
    } catch (error) {
        return res.status(401).json({mensagem: 'Falha na autenticação'}); 
    }

}