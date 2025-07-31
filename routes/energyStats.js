const express = require('express');
const router = express.Router();
const EnergyStats = require('../models/EnergyStats');

/**
 * @swagger
 * /energy/getenergyStats:
 *   get:
 *     summary: 获取所有能耗统计数据
 *     tags:
 *       - 能耗统计信息管理
 *     responses:
 *       200:
 *         description: 成功获取所有数据
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
 *                   electricity:
 *                     type: number
 *                     example: 1234.56
 *                     description: 电力消耗（单位：kWh）
 *                   water:
 *                     type: number
 *                     example: 78.9
 *                     description: 水消耗（单位：吨）
 *                   gas:
 *                     type: number
 *                     example: 56.7
 *                     description: 气体消耗（单位：m³）
 *                   areaOutput:
 *                     type: number
 *                     example: 15000
 *                     description: 同期产出面积（单位：平方米）
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
router.get('/getenergyStats', async (req, res) => {
    try {
        const data = await EnergyStats.find();
        res.json(data.map(d => d.toObject()));
    } catch (err) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

/**
 * @swagger
 * /energy/postenergyStats:
 *   post:
 *     summary: 新增一条能耗统计数据
 *     tags:
 *       - 能耗统计信息管理
 *     requestBody:
 *       description: 能耗统计数据对象
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
 *               electricity:
 *                 type: number
 *                 example: 1234.56
 *                 description: 电力消耗（单位：kWh）
 *               water:
 *                 type: number
 *                 example: 78.9
 *                 description: 水消耗（单位：吨）
 *               gas:
 *                 type: number
 *                 example: 56.7
 *                 description: 气体消耗（单位：m³）
 *               areaOutput:
 *                 type: number
 *                 example: 15000
 *                 description: 同期产出面积（单位：平方米）
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
 *                     electricity:
 *                       type: number
 *                       example: 1234.56
 *                     water:
 *                       type: number
 *                       example: 78.9
 *                     gas:
 *                       type: number
 *                       example: 56.7
 *                     areaOutput:
 *                       type: number
 *                       example: 15000
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 插入失败
 */
router.post('/postenergyStats', async (req, res) => {
    try {
        const stats = new EnergyStats(req.body);
        await stats.save();
        res.status(201).json({ message: '插入成功', stats: stats.toJSON() });
    } catch (err) {
        res.status(500).json({ error: '插入失败' });
    }
});

module.exports = router;
