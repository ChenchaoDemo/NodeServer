const express = require('express');
const router = express.Router();
const DailyProductionStats = require('../models/DailyProduction');

/**
 * @swagger
 * /daily/getdailyProductionStats:
 *   get:
 *     summary: 获取所有日生产统计数据
 *     tags:
 *       - 生产统计数据
 *     responses:
 *       200:
 *         description: 成功返回所有日生产统计数据
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
 *                     description: 统计日期（格式：YYYY-MM-DD）
 *                   productType:
 *                     type: string
 *                     example: "湿法隔膜"
 *                     description: 产品类型
 *                   totalOutput:
 *                     type: number
 *                     example: 15000
 *                     description: 总产量（平方米）
 *                   defectiveRate:
 *                     type: number
 *                     example: 2.5
 *                     description: 不良率（单位：%，如2.5表示2.5%）
 *                   machineCount:
 *                     type: integer
 *                     example: 5
 *                     description: 当天参与生产的设备数量
 *                   shift:
 *                     type: string
 *                     example: "白班"
 *                     description: 班次（白班/夜班）
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
router.get('/getdailyProductionStats', async (req, res) => {
    try {
        const data = await DailyProductionStats.find();
        res.json(data.map(d => d.toObject()));
    } catch (err) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

/**
 * @swagger
 * /daily/postdailyProductionStats:
 *   post:
 *     summary: 添加一条日生产统计数据
 *     tags:
 *       - 生产统计数据
 *     requestBody:
 *       description: 日生产统计数据对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-07-31"
 *                 description: 统计日期（格式：YYYY-MM-DD）
 *               productType:
 *                 type: string
 *                 example: "湿法隔膜"
 *                 description: 产品类型
 *               totalOutput:
 *                 type: number
 *                 example: 15000
 *                 description: 总产量（平方米）
 *               defectiveRate:
 *                 type: number
 *                 example: 2.5
 *                 description: 不良率（单位：%，如2.5表示2.5%）
 *               machineCount:
 *                 type: integer
 *                 example: 5
 *                 description: 设备数量
 *               shift:
 *                 type: string
 *                 example: "白班"
 *                 description: 班次
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
 *                 stats:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2025-07-31"
 *                     productType:
 *                       type: string
 *                       example: "湿法隔膜"
 *                     totalOutput:
 *                       type: number
 *                       example: 15000
 *                     defectiveRate:
 *                       type: number
 *                       example: 2.5
 *                     machineCount:
 *                       type: integer
 *                       example: 5
 *                     shift:
 *                       type: string
 *                       example: "白班"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 插入失败
 */
router.post('/postdailyProductionStats', async (req, res) => {
    try {
        const stats = new DailyProductionStats(req.body);
        await stats.save();
        res.status(201).json({ message: '插入成功', stats: stats.toJSON() });
    } catch (err) {
        res.status(500).json({ error: '插入失败' });
    }
});

module.exports = router;
