const express = require('express');
const router = express.Router();
const MaterialUsageStats = require('../models/MaterialUsageStats');

/**
 * @swagger
 * /material/getmaterialUsageStats:
 *   get:
 *     summary: 获取所有原材料使用统计数据
 *     tags:
 *       - 原材料使用情况统计接口
 *     responses:
 *       200:
 *         description: 成功获取数据
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "2025-07-31"
 *                     description: 统计日期
 *                   materialName:
 *                     type: string
 *                     example: "PE颗粒"
 *                     description: 原料名称（如 PE颗粒、无纺布）
 *                   usedAmount:
 *                     type: number
 *                     example: 500
 *                     description: 当天使用量（单位：kg）
 *                   stockRemaining:
 *                     type: number
 *                     example: 1200
 *                     description: 当前库存剩余量（单位：kg）
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 创建时间
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 更新时间
 *       500:
 *         description: 获取数据失败
 */
router.get('/getmaterialUsageStats', async (req, res) => {
    try {
        const data = await MaterialUsageStats.find();
        const result = data.map(item => item.toObject());
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

/**
 * @swagger
 * /material/postmaterialUsageStats:
 *   post:
 *     summary: 新增一条原材料使用统计数据
 *     tags:
 *       - 原材料使用情况统计接口
 *     requestBody:
 *       description: 原材料使用统计数据对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-07-31"
 *                 description: 统计日期
 *               materialName:
 *                 type: string
 *                 example: "PE颗粒"
 *                 description: 原料名称（如 PE颗粒、无纺布）
 *               usedAmount:
 *                 type: number
 *                 example: 500
 *                 description: 当天使用量（单位：kg）
 *               stockRemaining:
 *                 type: number
 *                 example: 1200
 *                 description: 当前库存剩余量（单位：kg）
 *             required:
 *               - date
 *     responses:
 *       201:
 *         description: 插入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 插入成功
 *                 stats:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2025-07-31"
 *                     materialName:
 *                       type: string
 *                       example: "PE颗粒"
 *                     usedAmount:
 *                       type: number
 *                       example: 500
 *                     stockRemaining:
 *                       type: number
 *                       example: 1200
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 插入失败
 */
router.post('/postmaterialUsageStats', async (req, res) => {
    try {
        const stats = new MaterialUsageStats(req.body);
        await stats.save();
        res.status(201).json({ message: '插入成功', stats: stats.toJSON() });
    } catch (err) {
        res.status(500).json({ error: '插入失败' });
    }
});

module.exports = router;
