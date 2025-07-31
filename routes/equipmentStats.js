const express = require('express');
const router = express.Router();
const EquipmentStats = require('../models/EquipmentStats');

/**
 * @swagger
 * /equipment/getequipmentStats:
 *   get:
 *     summary: 获取设备统计数据
 *     description: 获取所有设备运行状态、异常情况等统计信息
 *     tags:
 *       - 设备统计数据
 *     responses:
 *       200:
 *         description: 获取成功
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
 *                   equipmentCode:
 *                     type: string
 *                     example: "EQP-001"
 *                     description: 设备编号
 *                   runTime:
 *                     type: number
 *                     example: 20.5
 *                     description: 运行时长（单位：小时）
 *                   downtime:
 *                     type: number
 *                     example: 3.2
 *                     description: 停机时长（单位：小时）
 *                   faultCount:
 *                     type: integer
 *                     example: 2
 *                     description: 故障次数
 *                   utilizationRate:
 *                     type: number
 *                     example: 87.5
 *                     description: 设备利用率（单位：%，如87.5表示87.5%）
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 创建时间
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 更新时间
 *       500:
 *         description: 获取失败
 */
router.get('/getequipmentStats', async (req, res) => {
    try {
        const data = await EquipmentStats.find();
        res.json(data.map(d => d.toObject()));
    } catch (err) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

/**
 * @swagger
 * /equipment/postequipmentStats:
 *   post:
 *     summary: 添加设备统计数据
 *     description: 提交新的设备统计记录
 *     tags:
 *       - 设备统计数据
 *     requestBody:
 *       description: 设备统计数据对象
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
 *               equipmentCode:
 *                 type: string
 *                 example: "EQP-001"
 *                 description: 设备编号
 *               runTime:
 *                 type: number
 *                 example: 20.5
 *                 description: 运行时长（单位：小时）
 *               downtime:
 *                 type: number
 *                 example: 3.2
 *                 description: 停机时长（单位：小时）
 *               faultCount:
 *                 type: integer
 *                 example: 2
 *                 description: 故障次数
 *               utilizationRate:
 *                 type: number
 *                 example: 87.5
 *                 description: 设备利用率（单位：%，如87.5表示87.5%）
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
 *                     equipmentCode:
 *                       type: string
 *                       example: "EQP-001"
 *                     runTime:
 *                       type: number
 *                       example: 20.5
 *                     downtime:
 *                       type: number
 *                       example: 3.2
 *                     faultCount:
 *                       type: integer
 *                       example: 2
 *                     utilizationRate:
 *                       type: number
 *                       example: 87.5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 插入失败
 */
router.post('/postequipmentStats', async (req, res) => {
    try {
        const stats = new EquipmentStats(req.body);
        await stats.save();
        res.status(201).json({ message: '插入成功', stats: stats.toJSON() });
    } catch (err) {
        res.status(500).json({ error: '插入失败' });
    }
});

module.exports = router;
