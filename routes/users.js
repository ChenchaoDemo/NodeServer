var express = require('express');
var router = express.Router();
var User = require('../models/User');  // 路径改成 ../models/User

// 获取所有用户
/**
 * @swagger
 * /users/getInfo:
 *   get:
 *     summary: 获取用户信息（支持按名称模糊查询）
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 用户姓名（支持模糊查询）
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 */
router.get('/getInfo', async function(req, res, next) {
  try {
    const { name } = req.query;

    const query = {};
    if (name) {
      query.name = new RegExp(name, 'i'); // 模糊查询（忽略大小写）
    }

    // 查询时排除 _id 和 __v 字段
    const users = await User.find(query).select('-_id -__v');

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
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 提交成功，返回创建的用户信息
 */
router.post('/postInfo', async function(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();

    // 使用 toObject() 并过滤字段
    const responseData = user.toObject();
    delete responseData._id;
    delete responseData.__v;

    res.status(201).json({
      message: '提交成功',
      data: responseData
    });
  } catch (err) {
    res.status(500).json({ error: '创建用户失败' });
  }
});


module.exports = router;
