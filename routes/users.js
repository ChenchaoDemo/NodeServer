const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: 创建新用户（账号唯一）
 *     tags:
 *       - 用户
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
 *               phone:
 *                 type: string
 *                 description: 手机号
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: 性别
 *               age:
 *                 type: integer
 *                 description: 年龄
 *     responses:
 *       201:
 *         description: 用户创建成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 age:
 *                   type: integer
 *       400:
 *         description: 请求参数错误或账号已存在
 *       500:
 *         description: 服务器错误
 */
router.post('/create', async (req, res) => {
  const { account, password, phone, gender, age } = req.body;

  if (!account || !password) {
    return res.status(400).json({ error: '账号和密码是必填项' });
  }

  try {
    const existingUser = await User.findOne({ account });
    if (existingUser) {
      return res.status(400).json({ error: '账号已存在' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      account,
      password: hashedPassword,
      phone,
      gender,
      age,
    });

    await user.save();

    // 返回不包含密码的用户信息
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.__v;

    res.status(201).json(userObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

/**
 * @swagger
 * /users/getInfo:
 *   get:
 *     summary: 获取用户信息，支持按用户名模糊查询
 *     tags:
 *       - 用户
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 用户名（模糊查询，可选）
 *     responses:
 *       200:
 *         description: 用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   account:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   age:
 *                     type: integer
 *       500:
 *         description: 服务器错误
 */
router.get('/getInfo', async (req, res) => {
  try {
    const { name } = req.query;
    const query = {};

    if (name) {
      // 模糊查询，忽略大小写
      query.account = new RegExp(name, 'i');
    }

    // 查询，排除密码和敏感字段
    const users = await User.find(query).select('-password -__v -_id');

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

module.exports = router;
