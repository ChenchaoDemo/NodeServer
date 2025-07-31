const mongoose = require('mongoose');

const qualityStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },          // 检测日期
    productType: { type: String },                   // 产品类型
    sampleCount: { type: Number },                   // 抽检样本数量
    qualifiedCount: { type: Number },                // 合格样本数量
    avgThickness: { type: Number },                  // 平均厚度（单位：μm）
    avgPorosity: { type: Number },                   // 平均孔隙率（单位：%，如 42.3）
    avgStrength: { type: Number },                   // 平均拉伸强度（单位：MPa）
}, {
    timestamps: true,
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

module.exports = mongoose.model('QualityStats', qualityStatsSchema);
