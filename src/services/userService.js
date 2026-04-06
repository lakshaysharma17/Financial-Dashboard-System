const User = require('../models/User');

class UserService {
  // Get all users
  async getAllUsers(filters = {}) {
    const { role, status, page = 1, limit = 10 } = filters;

    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Create new user
  async createUser(userData) {
    const { email } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create(userData);
    return user;
  }

  // Update user
  async updateUser(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update allowed fields
    if (updateData.name) user.name = updateData.name;
    if (updateData.role) user.role = updateData.role;
    if (updateData.status) user.status = updateData.status;

    await user.save();
    return user;
  }

  // Delete user (soft delete by setting status to inactive)
  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.status = 'inactive';
    await user.save();

    return { message: 'User deactivated successfully' };
  }
}

module.exports = new UserService();
