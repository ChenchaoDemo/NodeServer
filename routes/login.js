const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const SECRET_KEY = 'your_secret_key';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 用户登录，返回 JWT Token
 *     tags:
 *       - 认证
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account
 *               - password
 *             properties:
 *               account:
 *                 type: string
 *                 description: 用户账号
 *               password:
 *                 type: string
 *                 description: 用户密码
 *     responses:
 *       200:
 *         description: 登录成功，返回token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: 请求参数错误
 *       401:
 *         description: 账号或密码错误
 *       500:
 *         description: 服务器错误
 */
router.post('/login', async (req, res) => {
    const { account, password } = req.body;
    if (!account || !password) {
        return res.status(400).json({ error: '账号和密码不能为空' });
    }
    try {
        const user = await User.findOne({ account });
        if (!user) return res.status(401).json({ error: '账号或密码错误' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: '账号或密码错误' });

        const token = jwt.sign({ id: user._id, account: user.account }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: '服务器错误' });
    }
});

module.exports = router;
