const express = require('express');
const router = express.Router();
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/auth');

// All routes require authentication and can be accessed by all roles
router.use(protect);
router.use(authorize('admin', 'analyst', 'viewer'));

router.get('/summary', getSummary);
router.get('/category-breakdown', getCategoryBreakdown);
router.get('/trends', getMonthlyTrends);

module.exports = router;
