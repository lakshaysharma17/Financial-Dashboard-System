const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerSchema, updateUserSchema } = require('../utils/validators');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getUsers).post(validate(registerSchema), createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(validate(updateUserSchema), updateUser)
  .delete(deleteUser);

module.exports = router;
