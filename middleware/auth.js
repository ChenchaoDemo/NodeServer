const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: '未提供访问令牌' });

    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = authHeader; // 直接把整个字符串当 token
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: '令牌无效或过期' });
        req.user = user;
        next();
    });
}


module.exports = authenticateToken;
