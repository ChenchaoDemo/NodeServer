const mongoose = require('mongoose');

const equipmentStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },          // 统计日期
    equipmentCode: { type: String },                 // 设备编号（例如：EQP-001）
    runTime: { type: Number },                       // 运行时长（单位：小时）
    downtime: { type: Number },                      // 停机时长（单位：小时）
    faultCount: { type: Number },                    // 故障次数
    utilizationRate: { type: Number },               // 设备利用率（单位：%，如 87.5 表示87.5%）
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

module.exports = mongoose.model('EquipmentStats', equipmentStatsSchema);
