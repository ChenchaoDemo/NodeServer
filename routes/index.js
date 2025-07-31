const express = require('express');
const router = express.Router();
const axios = require('axios');

let timer = null;
let isRunning = false;
let callCount = 0;

// 工具函数
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}
function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}
function getCurrentDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/* GET home page */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Node 服务',
    isRunning,
    callCount,
  });
});

// 自动化调用接口产生数据
/* 控制开关定时器接口 */
router.post('/toggle-timer', function (req, res) {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    return res.json({ status: 'stopped' });
  } else {
    callCount = 0;
    isRunning = true;
    timer = setInterval(async () => {
      const date = getCurrentDate();

      // 接口1参数
      const dailyProductionParams = {
        date,
        productType: randomChoice(['PE膜', 'PVC压延膜', '锂电池隔膜', '高效助剂', '彩印包装材料']),
        totalOutput: randomInt(100, 1000),
        defectiveRate: randomFloat(0, 5),
        machineCount: randomInt(1, 10),
        shift: randomChoice(['白班', '夜班']),
      };

      // 接口2参数
      const energyStatsParams = {
        date,
        electricity: randomFloat(50, 100),
        water: randomFloat(1, 10),
        gas: randomFloat(1, 10),
        areaOutput: randomInt(1, 100),
      };

      // 接口3参数
      const runTime = randomFloat(1, 24);
      const equipmentCode = `EQP-${String(randomInt(1, 999)).padStart(3, '0')}`;
      const utilizationRate = parseFloat(((runTime / 24) * 100).toFixed(2));
      const equipmentStatsParams = {
        date,
        equipmentCode,
        runTime,
        downtime: parseFloat((24 - runTime).toFixed(2)),
        faultCount: randomInt(0, 5),
        utilizationRate,
      };

      // 接口4参数
      const usedAmount = randomInt(10, 100);
      const materialUsageParams = {
        date,
        materialName: randomChoice(['PE颗粒', 'PVC颗粒', '锂电池隔膜基膜', '功能性助剂', '彩印包装油墨', '无纺布']),
        usedAmount,
        stockRemaining: 10000 - usedAmount,
      };

      // 接口5参数
      const sampleCount = randomInt(90, 100);
      const qualifiedCount = randomInt(90, sampleCount);
      const qualityStatsParams = {
        date,
        productType: randomChoice(['PE膜', 'PVC压延膜', '锂电池隔膜', '高效助剂', '彩印包装材料']),
        sampleCount,
        qualifiedCount,
        avgThickness: randomFloat(10, 20),
        avgPorosity: randomFloat(40, 50),
        avgStrength: randomFloat(30, 40),
      };

      try {
        await Promise.all([
          axios.post('http://192.168.1.49:3001/daily/postdailyProductionStats', dailyProductionParams),
          axios.post('http://192.168.1.49:3001/energy/postenergyStats', energyStatsParams),
          axios.post('http://192.168.1.49:3001/equipment/postequipmentStats', equipmentStatsParams),
          axios.post('http://192.168.1.49:3001/material/postmaterialUsageStats', materialUsageParams),
          axios.post('http://192.168.1.49:3001/quality/postqualityStats', qualityStatsParams),
        ]);
        callCount++;
      } catch (err) {
        console.error('接口调用失败:', err.message);
      }
    }, 3000); // 每3秒调用一次
    return res.json({ status: 'started' });
  }
});

/* 获取调用次数接口 */
router.get('/get-call-count', function (req, res) {
  res.json({ count: callCount });
});

module.exports = router;
