const mongoose = require('mongoose');

const materialUsageStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },          // 统计日期
    materialName: { type: String },                  // 原料名称（如 PE颗粒、无纺布）
    usedAmount: { type: Number },                    // 当天使用量（单位：kg）
    stockRemaining: { type: Number },                // 当前库存剩余量（单位：kg）
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

module.exports = mongoose.model('MaterialUsageStats', materialUsageStatsSchema);
