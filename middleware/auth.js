const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Resgata o token do header
    const token = req.header('x-auth-token');

    // Verifica se não é o token
    if(!token){
        return res.status(401).json({ msg: 'Sem token, autorização negada.' });
    }

    // Verificar token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inváliso.' });
    }
}