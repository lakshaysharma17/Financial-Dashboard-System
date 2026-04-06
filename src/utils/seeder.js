require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Record = require('../models/Record');
const connectDB = require('../config/db');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    status: 'active',
  },
  {
    name: 'John Analyst',
    email: 'analyst@example.com',
    password: 'analyst123',
    role: 'analyst',
    status: 'active',
  },
  {
    name: 'Jane Viewer',
    email: 'viewer@example.com',
    password: 'viewer123',
    role: 'viewer',
    status: 'active',
  },
];

// Generate sample records for the past 6 months
const generateRecords = (userId) => {
  const records = [];
  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus'],
    expense: ['Food', 'Rent', 'Transport', 'Entertainment', 'Utilities', 'Healthcare'],
  };

  const now = new Date();

  // Generate records for last 6 months
  for (let i = 0; i < 180; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Random chance of creating a record each day
    if (Math.random() > 0.3) {
      const type = Math.random() > 0.3 ? 'expense' : 'income';
      const categoryList = categories[type];
      const category = categoryList[Math.floor(Math.random() * categoryList.length)];

      let amount;
      if (type === 'income') {
        amount = category === 'Salary' 
          ? 50000 + Math.random() * 10000 
          : 5000 + Math.random() * 20000;
      } else {
        amount = category === 'Rent' 
          ? 15000 + Math.random() * 5000 
          : 500 + Math.random() * 5000;
      }

      records.push({
        userId,
        amount: parseFloat(amount.toFixed(2)),
        type,
        category,
        date,
        note: `${type === 'income' ? 'Received' : 'Paid'} for ${category.toLowerCase()}`,
      });
    }
  }

  return records;
};

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Record.deleteMany();

    console.log('🗑️  Existing data deleted');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('✅ Users created');

    // Create records for admin user
    const adminUser = createdUsers.find((u) => u.role === 'admin');
    const records = generateRecords(adminUser._id);

    await Record.insertMany(records);
    console.log('✅ Financial records created');

    console.log('\n📊 Seeder Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Records: ${records.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('   Admin:   admin@example.com / admin123');
    console.log('   Analyst: analyst@example.com / analyst123');
    console.log('   Viewer:  viewer@example.com / viewer123');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Record.deleteMany();

    console.log('🗑️  All data deleted');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
