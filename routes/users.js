var express = require('express');
var router = express.Router();
var User = require('../models/User');  // 路径改成 ../models/User

// 获取所有用户
/**
 * @swagger
 * /users/getInfo:
 *   get:
 *     summary: 获取用户信息
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 */
router.get('/getInfo', async function(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: '获取用户信息失败' });
  }
});
/**
 * @swagger
 * /users/postInfo:
 *   post:
 *     summary: 提交用户信息
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 提交成功
 */
router.post('/postInfo', async function(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: '创建用户失败' });
  }
});

module.exports = router;
