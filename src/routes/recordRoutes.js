const express = require('express');
const router = express.Router();
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordController');
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  createRecordSchema,
  updateRecordSchema,
} = require('../utils/validators');

// All routes require authentication
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'analyst', 'viewer'), getRecords)
  .post(authorize('admin'), validate(createRecordSchema), createRecord);

router
  .route('/:id')
  .get(authorize('admin', 'analyst', 'viewer'), getRecordById)
  .patch(authorize('admin'), validate(updateRecordSchema), updateRecord)
  .delete(authorize('admin'), deleteRecord);

module.exports = router;
