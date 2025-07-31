const mongoose = require('mongoose');

const dailyProductionStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },          // 统计日期（格式：YYYY-MM-DD）
    productType: { type: String },                   // 产品类型（例如：干法隔膜、湿法隔膜）
    totalOutput: { type: Number },                   // 总产量（单位：平方米）
    defectiveRate: { type: Number },                 // 不良率（单位：%，小数表示如 2.5 表示 2.5%）
    machineCount: { type: Number },                  // 当天参与生产的设备数量
    shift: { type: String },                         // 班次（如：白班、夜班）
}, {
    timestamps: true,                                // 自动添加 createdAt 和 updatedAt 字段
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('DailyProduction', dailyProductionStatsSchema);
