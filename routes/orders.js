const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Order = require('../models/Order');

/**
 * @swagger
 * /orders/myOrders:
 *   get:
 *     summary: 获取当前登录用户的订单列表
 *     tags:
 *       - 订单
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 订单列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   product:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: 未授权，缺少或错误的Token
 *       500:
 *         description: 服务器错误
 */
router.get('/myOrders', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: '获取订单失败' });
    }
});

/**
 * @swagger
 * /orders/addOrder:
 *   post:
 *     summary: 提交当前登录用户的订单信息
 *     tags:
 *       - 订单
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *               - price
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: 订单提交成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: 未授权，缺少或错误的Token
 *       500:
 *         description: 服务器错误
 */
router.post('/addOrder', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { product, quantity, price } = req.body;
        const order = new Order({ userId, product, quantity, price });
        await order.save();
        res.status(201).json({ message: '订单提交成功', order });
    } catch (err) {
        res.status(500).json({ error: '提交订单失败' });
    }
});

module.exports = router;
