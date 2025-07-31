const express = require('express');
const router = express.Router();
const QualityStats = require('../models/QualityStats');

/**
 * @swagger
 * /quality/getqualityStats:
 *   get:
 *     summary: 获取质量统计信息
 *     tags:
 *       - 质量信息统计接口
 *     description: 返回所有质量统计的数据。
 *     responses:
 *       200:
 *         description: 成功返回数据
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/quality/getqualityStats"
 *                   description: 当前请求完整URL地址
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: "2025-07-01"
 *                         description: 检测日期
 *                       productType:
 *                         type: string
 *                         example: "干法隔膜"
 *                         description: 产品类型
 *                       sampleCount:
 *                         type: integer
 *                         example: 100
 *                         description: 抽检样本数量
 *                       qualifiedCount:
 *                         type: integer
 *                         example: 98
 *                         description: 合格样本数量
 *                       avgThickness:
 *                         type: number
 *                         example: 12.5
 *                         description: 平均厚度（单位：μm）
 *                       avgPorosity:
 *                         type: number
 *                         example: 42.3
 *                         description: 平均孔隙率（单位：%）
 *                       avgStrength:
 *                         type: number
 *                         example: 35.7
 *                         description: 平均拉伸强度（单位：MPa）
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 创建时间
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 更新时间
 *       500:
 *         description: 获取失败
 */
router.get('/getqualityStats', async (req, res) => {
    try {
        const data = await QualityStats.find();
        res.json({
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            data: data.map(d => d.toObject())
        });
    } catch (err) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

/**
 * @swagger
 * /quality/postqualityStats:
 *   post:
 *     summary: 新增质量统计信息
 *     tags:
 *       - 质量信息统计接口
 *     description: 插入一条新的质量统计记录。
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-07-01"
 *                 description: 日期
 *               productType:
 *                 type: string
 *                 example: "干法隔膜"
 *                 description: 产品类型
 *               sampleCount:
 *                 type: integer
 *                 example: 100
 *                 description: 抽检样本数量
 *               qualifiedCount:
 *                 type: integer
 *                 example: 98
 *                 description: 合格样本数量
 *               avgThickness:
 *                 type: number
 *                 example: 12.5
 *                 description: 平均厚度（单位：μm）
 *               avgPorosity:
 *                 type: number
 *                 example: 42.3
 *                 description: 平均孔隙率（单位：%）
 *               avgStrength:
 *                 type: number
 *                 example: 35.7
 *                 description: 平均拉伸强度（单位：MPa）
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
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/quality/postqualityStats"
 *                 stats:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2025-07-01"
 *                     productType:
 *                       type: string
 *                       example: "干法隔膜"
 *                     sampleCount:
 *                       type: integer
 *                       example: 100
 *                     qualifiedCount:
 *                       type: integer
 *                       example: 98
 *                     avgThickness:
 *                       type: number
 *                       example: 12.5
 *                     avgPorosity:
 *                       type: number
 *                       example: 42.3
 *                     avgStrength:
 *                       type: number
 *                       example: 35.7
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 插入失败
 */
router.post('/postqualityStats', async (req, res) => {
    try {
        const stats = new QualityStats(req.body);
        await stats.save();
        res.status(201).json({
            message: '插入成功',
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            stats: stats.toJSON()
        });
    } catch (err) {
        res.status(500).json({ error: '插入失败' });
    }
});

module.exports = router;
