const Record = require('../models/Record');

class RecordService {
  // Create new record
  async createRecord(userId, recordData) {
    const record = await Record.create({
      ...recordData,
      userId,
    });
    return record;
  }

  // Get all records with filtering
  async getRecords(filters = {}) {
    const {
      type,
      category,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
    } = filters;

    const query = { isDeleted: false };

    // Apply filters
    if (type) query.type = type;
    if (category) query.category = new RegExp(category, 'i');
    if (search) {
      query.$or = [
        { category: new RegExp(search, 'i') },
        { note: new RegExp(search, 'i') },
      ];
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const records = await Record.find(query)
      .populate('userId', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Record.countDocuments(query);

    return {
      records,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get record by ID
  async getRecordById(recordId) {
    const record = await Record.findOne({
      _id: recordId,
      isDeleted: false,
    }).populate('userId', 'name email');

    if (!record) {
      throw new Error('Record not found');
    }
    return record;
  }

  // Update record
  async updateRecord(recordId, updateData) {
    const record = await Record.findOne({
      _id: recordId,
      isDeleted: false,
    });

    if (!record) {
      throw new Error('Record not found');
    }

    Object.keys(updateData).forEach((key) => {
      record[key] = updateData[key];
    });

    await record.save();
    return record;
  }

  // Delete record (soft delete)
  async deleteRecord(recordId) {
    const record = await Record.findById(recordId);
    if (!record) {
      throw new Error('Record not found');
    }

    record.isDeleted = true;
    await record.save();

    return { message: 'Record deleted successfully' };
  }

  // Get dashboard summary
  async getSummary(filters = {}) {
    const { startDate, endDate } = filters;

    const query = { isDeleted: false };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Record.find(query);

    const totalIncome = records
      .filter((r) => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter((r) => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    return {
      totalIncome: parseFloat(totalIncome.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      netBalance: parseFloat(netBalance.toFixed(2)),
      transactionCount: records.length,
    };
  }

  // Get category breakdown
  async getCategoryBreakdown(filters = {}) {
    const { type, startDate, endDate } = filters;

    const matchStage = { isDeleted: false };
    if (type) matchStage.type = type;
    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    const breakdown = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { type: '$type', category: '$category' },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: '$_id.type',
          category: '$_id.category',
          total: { $round: ['$total', 2] },
          count: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    return breakdown;
  }

  // Get monthly trends
  async getMonthlyTrends(year) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const trends = await Record.aggregate([
      {
        $match: {
          isDeleted: false,
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: '$_id.month',
          income: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          income: { $round: ['$income', 2] },
          expense: { $round: ['$expense', 2] },
          net: { $round: [{ $subtract: ['$income', '$expense'] }, 2] },
        },
      },
      { $sort: { month: 1 } },
    ]);

    // Fill in missing months with zero values
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const fullTrends = monthNames.map((name, index) => {
      const monthData = trends.find((t) => t.month === index + 1);
      return {
        month: name,
        income: monthData ? monthData.income : 0,
        expense: monthData ? monthData.expense : 0,
        net: monthData ? monthData.net : 0,
      };
    });

    return fullTrends;
  }
}

module.exports = new RecordService();
