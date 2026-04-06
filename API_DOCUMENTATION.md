# API Documentation

Complete API reference for the Financial Records Management System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "viewer"  // Optional: viewer, analyst, admin (default: viewer)
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer",
    "status": "active",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"email\" must be a valid email",
    "\"password\" length must be at least 6 characters long"
  ]
}
```

---

### Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "status": "active",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Current User Profile

**GET** `/auth/me`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "status": "active",
    "createdAt": "2025-04-01T10:30:00.000Z",
    "updatedAt": "2025-04-01T10:30:00.000Z"
  }
}
```

---

## 👥 User Management Endpoints (Admin Only)

### Get All Users

**GET** `/users`

Retrieve all users with optional filtering and pagination.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `role` (optional): Filter by role (viewer, analyst, admin)
- `status` (optional): Filter by status (active, inactive)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/users?role=admin&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-04-01T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}
```

---

### Get User by ID

**GET** `/users/:id`

Get details of a specific user.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer",
    "status": "active",
    "createdAt": "2025-04-01T10:30:00.000Z",
    "updatedAt": "2025-04-01T10:30:00.000Z"
  }
}
```

---

### Create User

**POST** `/users`

Create a new user (Admin only).

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "analyst"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "analyst",
    "status": "active"
  }
}
```

---

### Update User

**PATCH** `/users/:id`

Update user details (Admin only).

**Request Body:**
```json
{
  "name": "Jane Updated",
  "role": "admin",
  "status": "inactive"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "name": "Jane Updated",
    "email": "jane@example.com",
    "role": "admin",
    "status": "inactive"
  }
}
```

---

### Delete User

**DELETE** `/users/:id`

Deactivate a user (soft delete - Admin only).

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

---

## 💰 Financial Records Endpoints

### Get All Records

**GET** `/records`

Retrieve financial records with filtering and pagination.

**Access:** All authenticated users (viewer, analyst, admin)

**Query Parameters:**
- `type` (optional): Filter by type (income, expense)
- `category` (optional): Filter by category
- `startDate` (optional): Start date (ISO format: YYYY-MM-DD)
- `endDate` (optional): End date (ISO format: YYYY-MM-DD)
- `search` (optional): Search in category and note
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Requests:**
```
GET /api/records?type=income
GET /api/records?category=Salary&startDate=2025-01-01&endDate=2025-03-31
GET /api/records?search=food&page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "userId": {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "amount": 50000,
      "type": "income",
      "category": "Salary",
      "date": "2025-04-01T00:00:00.000Z",
      "note": "Monthly salary",
      "createdAt": "2025-04-01T10:30:00.000Z",
      "updatedAt": "2025-04-01T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 10,
    "pages": 16
  }
}
```

---

### Get Record by ID

**GET** `/records/:id`

Get details of a specific financial record.

**Access:** All authenticated users

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "userId": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "amount": 50000,
    "type": "income",
    "category": "Salary",
    "date": "2025-04-01T00:00:00.000Z",
    "note": "Monthly salary",
    "createdAt": "2025-04-01T10:30:00.000Z"
  }
}
```

---

### Create Record

**POST** `/records`

Create a new financial record.

**Access:** Admin only

**Request Body:**
```json
{
  "amount": 3500.50,
  "type": "expense",
  "category": "Food",
  "date": "2025-04-05",
  "note": "Grocery shopping"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1d",
    "userId": "60d5ec49f1b2c72b8c8e4f1a",
    "amount": 3500.50,
    "type": "expense",
    "category": "Food",
    "date": "2025-04-05T00:00:00.000Z",
    "note": "Grocery shopping",
    "isDeleted": false,
    "createdAt": "2025-04-05T10:30:00.000Z"
  }
}
```

**Validation Errors (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"amount\" must be a positive number",
    "\"type\" must be one of [income, expense]"
  ]
}
```

---

### Update Record

**PATCH** `/records/:id`

Update an existing financial record.

**Access:** Admin only

**Request Body:**
```json
{
  "amount": 4000,
  "category": "Groceries",
  "note": "Updated grocery shopping"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1d",
    "userId": "60d5ec49f1b2c72b8c8e4f1a",
    "amount": 4000,
    "type": "expense",
    "category": "Groceries",
    "date": "2025-04-05T00:00:00.000Z",
    "note": "Updated grocery shopping"
  }
}
```

---

### Delete Record

**DELETE** `/records/:id`

Soft delete a financial record.

**Access:** Admin only

**Success Response (200):**
```json
{
  "success": true,
  "message": "Record deleted successfully"
}
```

---

## 📊 Dashboard Analytics Endpoints

### Get Financial Summary

**GET** `/dashboard/summary`

Get aggregated financial summary.

**Access:** All authenticated users

**Query Parameters:**
- `startDate` (optional): Start date for summary period
- `endDate` (optional): End date for summary period

**Example Request:**
```
GET /api/dashboard/summary?startDate=2025-01-01&endDate=2025-03-31
```

**Success Response (200):**
```json
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

---

### Get Category Breakdown

**GET** `/dashboard/category-breakdown`

Get spending/income breakdown by category.

**Access:** All authenticated users

**Query Parameters:**
- `type` (optional): Filter by income or expense
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Example Request:**
```
GET /api/dashboard/category-breakdown?type=expense&startDate=2025-01-01
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "type": "expense",
      "category": "Rent",
      "total": 45000.00,
      "count": 3
    },
    {
      "type": "expense",
      "category": "Food",
      "total": 18500.50,
      "count": 45
    },
    {
      "type": "expense",
      "category": "Transport",
      "total": 6000.00,
      "count": 30
    }
  ]
}
```

---

### Get Monthly Trends

**GET** `/dashboard/trends`

Get monthly income and expense trends.

**Access:** All authenticated users

**Query Parameters:**
- `year` (optional): Year for trends (default: current year)

**Example Request:**
```
GET /api/dashboard/trends?year=2025
```

**Success Response (200):**
```json
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
    },
    {
      "month": "Mar",
      "income": 50000.00,
      "expense": 22000.00,
      "net": 28000.00
    },
    // ... continues for all 12 months
  ]
}
```

---

## 🔍 Common Query Patterns

### Complex Filtering Example

Get all food expenses from January to March with pagination:

```
GET /api/records?type=expense&category=Food&startDate=2025-01-01&endDate=2025-03-31&page=1&limit=20
```

### Dashboard Analytics for Quarter

```
GET /api/dashboard/summary?startDate=2025-01-01&endDate=2025-03-31
GET /api/dashboard/category-breakdown?startDate=2025-01-01&endDate=2025-03-31
```

---

## ⚠️ Error Codes

| Code | Description                        |
|------|------------------------------------|
| 200  | Success                            |
| 201  | Resource created successfully      |
| 400  | Bad request / Validation error     |
| 401  | Unauthorized / Invalid token       |
| 403  | Forbidden / Insufficient permissions |
| 404  | Resource not found                 |
| 500  | Internal server error              |

---

## 🔒 Authorization Matrix

| Endpoint                    | Viewer | Analyst | Admin |
|-----------------------------|--------|---------|-------|
| GET /records                | ✅     | ✅      | ✅    |
| POST /records               | ❌     | ❌      | ✅    |
| PATCH /records/:id          | ❌     | ❌      | ✅    |
| DELETE /records/:id         | ❌     | ❌      | ✅    |
| GET /dashboard/*            | ✅     | ✅      | ✅    |
| GET /users                  | ❌     | ❌      | ✅    |
| POST /users                 | ❌     | ❌      | ✅    |
| PATCH /users/:id            | ❌     | ❌      | ✅    |

---

## 🧪 Testing with cURL

### Register and Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Create Record
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"amount":5000,"type":"income","category":"Freelance","date":"2025-04-05"}'
```

### Get Dashboard Summary
```bash
curl -X GET "http://localhost:5000/api/dashboard/summary?startDate=2025-01-01" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
