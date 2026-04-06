const asyncHandler = require('express-async-handler');
const recordService = require('../services/recordService');

// @desc    Create new record
// @route   POST /api/records
// @access  Private/Admin
const createRecord = asyncHandler(async (req, res) => {
  const record = await recordService.createRecord(req.user._id, req.body);

  res.status(201).json({
    success: true,
    data: record,
  });
});

// @desc    Get all records
// @route   GET /api/records
// @access  Private (All roles)
const getRecords = asyncHandler(async (req, res) => {
  const result = await recordService.getRecords(req.query);

  res.json({
    success: true,
    data: result.records,
    pagination: result.pagination,
  });
});

// @desc    Get record by ID
// @route   GET /api/records/:id
// @access  Private (All roles)
const getRecordById = asyncHandler(async (req, res) => {
  const record = await recordService.getRecordById(req.params.id);

  res.json({
    success: true,
    data: record,
  });
});

// @desc    Update record
// @route   PATCH /api/records/:id
// @access  Private/Admin
const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body);

  res.json({
    success: true,
    data: record,
  });
});

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private/Admin
const deleteRecord = asyncHandler(async (req, res) => {
  const result = await recordService.deleteRecord(req.params.id);

  res.json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
