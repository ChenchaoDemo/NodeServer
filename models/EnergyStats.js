const mongoose = require('mongoose');

const energyStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },          // 统计日期
    electricity: { type: Number },                   // 电力消耗（单位：kWh）
    water: { type: Number },                         // 水消耗（单位：吨）
    gas: { type: Number },                           // 气体消耗（单位：m³）
    areaOutput: { type: Number },                    // 同期产出面积（单位：平方米）
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

module.exports = mongoose.model('EnergyStats', energyStatsSchema);
