# Financial Records Management System

A production-grade RESTful API for managing financial records with role-based access control (RBAC), built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Create, update, and manage users with different roles
- **Financial Records**: Track income and expenses with detailed categorization
- **Advanced Filtering**: Filter by type, category, date range, and search
- **Dashboard Analytics**: 
  - Financial summary (income, expense, net balance)
  - Category breakdown with aggregations
  - Monthly trends and visualizations
- **Pagination**: Efficient data retrieval with pagination support
- **Soft Delete**: Records are soft-deleted for data integrity
- **Validation**: Request validation using Joi schemas
- **Error Handling**: Comprehensive error handling with standardized responses

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: bcryptjs for password hashing

## 📁 Project Structure

```
finance-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User management
│   │   ├── recordController.js   # Financial records
│   │   └── dashboardController.js # Analytics
│   ├── middlewares/
│   │   ├── auth.js               # JWT & RBAC middleware
│   │   ├── validate.js           # Validation middleware
│   │   └── error.js              # Error handlers
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Record.js             # Financial record schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── recordRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── authService.js        # Auth business logic
│   │   ├── userService.js        # User business logic
│   │   └── recordService.js      # Record business logic
│   ├── utils/
│   │   ├── generateToken.js      # JWT token generation
│   │   ├── validators.js         # Joi schemas
│   │   └── seeder.js             # Database seeder
│   └── app.js                    # Express app setup
├── server.js                     # Entry point
├── package.json
├── .env.example
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd finance-backend

# Install dependencies
npm install
```

### Step 2: Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=7777
MONGO_URI=mongodb://localhost:27017/finance-db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

### Step 3: Seed Database (Optional)

```bash
# Import sample data
npm run seed

# Delete all data
npm run seed -- -d
```

### Step 4: Start Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will be running at `http://localhost:5000`

## 🔐 Role-Based Access Control

| Role    | Read Records | Create Records | Update Records | Delete Records | Manage Users |
|---------|--------------|----------------|----------------|----------------|--------------|
| Viewer  | ✅           | ❌             | ❌             | ❌             | ❌           |
| Analyst | ✅           | ❌             | ❌             | ❌             | ❌           |
| Admin   | ✅           | ✅             | ✅             | ✅             | ✅           |

## 📡 API Endpoints

### Authentication

| Method | Endpoint          | Description      | Access  |
|--------|-------------------|------------------|---------|
| POST   | `/api/auth/register` | Register user | Public  |
| POST   | `/api/auth/login`    | Login user    | Public  |
| GET    | `/api/auth/me`       | Get profile   | Private |

### Users (Admin Only)

| Method | Endpoint          | Description       | Access       |
|--------|-------------------|-------------------|--------------|
| GET    | `/api/users`      | Get all users     | Admin        |
| GET    | `/api/users/:id`  | Get user by ID    | Admin        |
| POST   | `/api/users`      | Create user       | Admin        |
| PATCH  | `/api/users/:id`  | Update user       | Admin        |
| DELETE | `/api/users/:id`  | Deactivate user   | Admin        |

### Financial Records

| Method | Endpoint            | Description         | Access              |
|--------|---------------------|---------------------|---------------------|
| GET    | `/api/records`      | Get all records     | All authenticated   |
| GET    | `/api/records/:id`  | Get record by ID    | All authenticated   |
| POST   | `/api/records`      | Create record       | Admin               |
| PATCH  | `/api/records/:id`  | Update record       | Admin               |
| DELETE | `/api/records/:id`  | Delete record       | Admin               |

### Dashboard Analytics

| Method | Endpoint                           | Description          | Access            |
|--------|------------------------------------|----------------------|-------------------|
| GET    | `/api/dashboard/summary`           | Financial summary    | All authenticated |
| GET    | `/api/dashboard/category-breakdown`| Category breakdown   | All authenticated |
| GET    | `/api/dashboard/trends`            | Monthly trends       | All authenticated |

## 📝 API Usage Examples

### 1. Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "viewer"
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

# Response
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create Financial Record

```bash
POST /api/records
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "amount": 50000,
  "type": "income",
  "category": "Salary",
  "date": "2025-04-01",
  "note": "Monthly salary"
}
```

### 4. Get Records with Filters

```bash
# Filter by type
GET /api/records?type=income

# Filter by category
GET /api/records?category=salary

# Filter by date range
GET /api/records?startDate=2025-01-01&endDate=2025-03-31

# Search
GET /api/records?search=food

# Pagination
GET /api/records?page=1&limit=10

# Combined filters
GET /api/records?type=expense&category=food&startDate=2025-01-01&page=1&limit=10
```

### 5. Get Dashboard Summary

```bash
GET /api/dashboard/summary
Authorization: Bearer <your-token>

# Response
{
  "success": true,
  "data": {
    "totalIncome": 150000.00,
    "totalExpense": 75000.50,
    "netBalance": 74999.50,
    "transactionCount": 156
  }
}
```

### 6. Get Category Breakdown

```bash
GET /api/dashboard/category-breakdown?type=expense
Authorization: Bearer <your-token>

# Response
{
  "success": true,
  "data": [
    {
      "type": "expense",
      "category": "Rent",
      "total": 30000.00,
      "count": 3
    },
    {
      "type": "expense",
      "category": "Food",
      "total": 15000.50,
      "count": 45
    }
  ]
}
```

### 7. Get Monthly Trends

```bash
GET /api/dashboard/trends?year=2025
Authorization: Bearer <your-token>

# Response
{
  "success": true,
  "data": [
    {
      "month": "Jan",
      "income": 50000.00,
      "expense": 25000.00,
      "net": 25000.00
    },
    {
      "month": "Feb",
      "income": 50000.00,
      "expense": 28000.50,
      "net": 21999.50
    }
  ]
}
```

## 🔒 Test Credentials (After Seeding)

```
Admin Account:
  Email: admin@example.com
  Password: admin123

Analyst Account:
  Email: analyst@example.com
  Password: analyst123

Viewer Account:
  Email: viewer@example.com
  Password: viewer123
```

## ⚙️ Query Parameters

### Records Endpoint

| Parameter   | Type   | Description                    | Example                |
|-------------|--------|--------------------------------|------------------------|
| type        | string | Filter by income/expense       | `?type=income`         |
| category    | string | Filter by category             | `?category=salary`     |
| startDate   | date   | Start date (ISO format)        | `?startDate=2025-01-01`|
| endDate     | date   | End date (ISO format)          | `?endDate=2025-12-31`  |
| search      | string | Search in category/note        | `?search=food`         |
| page        | number | Page number (default: 1)       | `?page=2`              |
| limit       | number | Items per page (default: 10)   | `?limit=20`            |

### Dashboard Endpoints

| Parameter   | Type   | Description                    | Example                |
|-------------|--------|--------------------------------|------------------------|
| type        | string | Filter breakdown by type       | `?type=expense`        |
| startDate   | date   | Start date for summary         | `?startDate=2025-01-01`|
| endDate     | date   | End date for summary           | `?endDate=2025-03-31`  |
| year        | number | Year for trends (default: current) | `?year=2025`      |

## 🧪 Error Response Format

All errors follow this standard format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 📊 Database Schema

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "viewer" | "analyst" | "admin",
  status: "active" | "inactive",
  createdAt: Date,
  updatedAt: Date
}
```

### Record Schema

```javascript
{
  userId: ObjectId (ref: User),
  amount: Number (min: 0.01),
  type: "income" | "expense",
  category: String,
  date: Date,
  note: String (max: 500 chars),
  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Key Design Decisions

### 1. Separation of Concerns
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define data structure and validation

### 2. Security
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with configurable expiration
- Role-based middleware for authorization
- Input validation on all endpoints

### 3. Data Integrity
- Soft delete for records (preserves data)
- Indexed fields for performance
- Referential integrity with user relationships

### 4. API Design
- RESTful naming conventions
- Consistent response format
- Comprehensive error messages
- Pagination for large datasets

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-db
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=7d
```

### Deployment Platforms

- **Render**: Easy deployment with free tier
- **Railway**: Simple setup with MongoDB support
- **Heroku**: Classic PaaS option
- **AWS/GCP/Azure**: Enterprise-grade solutions

## 🔮 Future Enhancements

- [ ] Export data to CSV/Excel
- [ ] Recurring transactions
- [ ] Budget limits and alerts
- [ ] Multi-currency support
- [ ] File attachments (receipts)
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Audit logs
- [ ] API rate limiting
- [ ] Caching with Redis



## 👨‍💻 Author
**lakshaysharma17**
- GitHub: [@lakshaysharma17](https://github.com/lakshaysharma17)

---

**Note**: This is a backend assignment showcasing system design, RBAC implementation, and data aggregation logic. For production use, add additional security measures, monitoring, and testing.
