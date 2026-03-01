const express = require('express');
const { dataStore } = require('../dataStore');

const router = express.Router();

// GET /api/health-tips - Get health tips
router.get('/', (req, res) => {
  const { category } = req.query;
  
  let tips = dataStore.healthTips;
  
  if (category) {
    tips = tips.filter(t => t.category === category);
  }

  // Get random tip for "tip of the day"
  const tipOfTheDay = tips[Math.floor(Math.random() * tips.length)];

  res.json({
    success: true,
    tips,
    tipOfTheDay,
    categories: [...new Set(dataStore.healthTips.map(t => t.category))]
  });
});

module.exports = router;
