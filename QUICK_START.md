# 🚀 Quick Start Guide

Get your Financial Records API running in 5 minutes!

## ⚡ Super Quick Setup

```bash
# 1. Navigate to project
cd finance-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Update .env with your MongoDB URI
# If using local MongoDB: mongodb://localhost:27017/finance-db
# If using MongoDB Atlas: your connection string

# 5. Seed database with sample data
npm run seed

# 6. Start server
npm run dev
```

## ✅ Server Running!

```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

Visit: `http://localhost:5000`

---

## 🔐 Test Credentials (After Seeding)

```
Admin:
  Email: admin@example.com
  Password: admin123
  Role: Full access

Analyst:
  Email: analyst@example.com
  Password: analyst123
  Role: Read-only

Viewer:
  Email: viewer@example.com
  Password: viewer123
  Role: Read-only
```

---

## 📱 Test with Postman

1. Import `postman_collection.json` into Postman
2. Use "Login" request with admin credentials
3. Token is automatically saved in collection variables
4. Test all other endpoints!

---

## 🧪 Test with cURL

### 1. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

Copy the token from response.

### 2. Create a Record
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 5000,
    "type": "income",
    "category": "Freelance",
    "date": "2025-04-05",
    "note": "Client project payment"
  }'
```

### 3. Get Dashboard Summary
```bash
curl -X GET http://localhost:5000/api/dashboard/summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📂 Project Structure

```
finance-backend/
├── src/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middlewares/     # Auth, validation, errors
│   └── utils/           # Helpers & validators
├── server.js            # Entry point
├── package.json
└── .env
```

---

## 🎯 Key Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- 3 roles: Viewer, Analyst, Admin

### ✅ Financial Records
- Create, Read, Update, Delete operations
- Advanced filtering (type, category, date range)
- Search functionality
- Pagination support
- Soft delete

### ✅ Dashboard Analytics
- Financial summary (income, expense, balance)
- Category breakdown with counts
- Monthly trends for the year

### ✅ Best Practices
- Separation of concerns (MVC pattern)
- Service layer for business logic
- Joi validation
- Comprehensive error handling
- Clean API design

---

## 🔥 API Highlights

### Quick Reference

```
AUTH
POST   /api/auth/register        # Register user
POST   /api/auth/login           # Login
GET    /api/auth/me              # Get profile

USERS (Admin only)
GET    /api/users                # List users
POST   /api/users                # Create user
PATCH  /api/users/:id            # Update user

RECORDS
GET    /api/records              # Get records (all roles)
POST   /api/records              # Create record (admin)
PATCH  /api/records/:id          # Update record (admin)
DELETE /api/records/:id          # Delete record (admin)

DASHBOARD (All roles)
GET    /api/dashboard/summary              # Financial summary
GET    /api/dashboard/category-breakdown   # Category stats
GET    /api/dashboard/trends               # Monthly trends
```

---

## 💡 Common Tasks

### Filter Records by Date Range
```
GET /api/records?startDate=2025-01-01&endDate=2025-03-31
```

### Search in Records
```
GET /api/records?search=food
```

### Get Expense Breakdown
```
GET /api/dashboard/category-breakdown?type=expense
```

### Get 2025 Trends
```
GET /api/dashboard/trends?year=2025
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix**: Make sure MongoDB is running locally or update `MONGO_URI` in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix**: Change `PORT` in `.env` to another port (e.g., 5001)

### JWT Token Error
```
Error: Not authorized, token failed
```
**Fix**: Make sure you're sending the token in Authorization header:
```
Authorization: Bearer YOUR_TOKEN
```

---

## 📖 Documentation

- `README.md` - Complete project documentation
- `API_DOCUMENTATION.md` - Detailed API reference
- `postman_collection.json` - Postman collection for testing

---

## 🎓 Interview Tips

This project demonstrates:

1. **System Design**: Clean architecture with separation of concerns
2. **RBAC**: Proper role-based authorization
3. **Data Aggregation**: Complex MongoDB aggregations for analytics
4. **Best Practices**: Validation, error handling, security
5. **API Design**: RESTful, consistent, well-documented

**Key Points to Mention**:
- Service layer pattern for testability
- Soft delete for data integrity
- JWT with configurable expiration
- MongoDB indexes for performance
- Comprehensive error responses

---

## 🚀 Next Steps

1. Test all API endpoints
2. Review the code structure
3. Check the dashboard analytics
4. Read `API_DOCUMENTATION.md` for detailed examples
5. Import Postman collection for easy testing

---

**Need Help?**

Check the full README.md for detailed information about:
- Complete API documentation
- Error handling
- Database schemas
- Deployment guides
- Future enhancements

---

**Good luck with your interview! 🎉**
