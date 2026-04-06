const asyncHandler = require('express-async-handler');
const recordService = require('../services/recordService');

// @desc    Get financial summary
// @route   GET /api/dashboard/summary
// @access  Private (All roles)
const getSummary = asyncHandler(async (req, res) => {
  const summary = await recordService.getSummary(req.query);

  res.json({
    success: true,
    data: summary,
  });
});

// @desc    Get category breakdown
// @route   GET /api/dashboard/category-breakdown
// @access  Private (All roles)
const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const breakdown = await recordService.getCategoryBreakdown(req.query);

  res.json({
    success: true,
    data: breakdown,
  });
});

// @desc    Get monthly trends
// @route   GET /api/dashboard/trends
// @access  Private (All roles)
const getMonthlyTrends = asyncHandler(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const trends = await recordService.getMonthlyTrends(year);

  res.json({
    success: true,
    data: trends,
  });
});

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
};
