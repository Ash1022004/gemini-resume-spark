# MongoDB Backend API Requirements

## Overview
This document outlines the backend API endpoints you need to implement to support the Resume Builder application.

## Tech Stack Recommendations
- **Backend Framework**: Node.js with Express.js OR Python with Flask/FastAPI
- **Database**: MongoDB (MongoDB Atlas recommended)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Stripe (for subscriptions)

## Base URL
Replace `YOUR_BACKEND_API_URL` in `src/services/mongoApi.ts` with your actual backend URL.

Example: `https://your-api.com/api` or `http://localhost:3000/api`

---

## Authentication Endpoints

### 1. Sign Up
**POST** `/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "subscription": "free",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**MongoDB Schema:**
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash with bcrypt
  name: { type: String, required: true },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  subscriptionExpiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});
```

---

### 2. Sign In
**POST** `/auth/signin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "subscription": "free",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Sign Out
**POST** `/auth/signout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Signed out successfully"
}
```

---

## Resume Endpoints

### 4. Create Resume
**POST** `/resumes`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "My Resume",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "location": "New York, NY",
    "linkedIn": "linkedin.com/in/johndoe",
    "website": "johndoe.com"
  },
  "summary": "Experienced professional...",
  "experience": [
    {
      "id": "1234567890",
      "title": "Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "startDate": "2020-01",
      "endDate": "2023-06",
      "current": false,
      "description": "Developed web applications..."
    }
  ],
  "education": [
    {
      "id": "9876543210",
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University Name",
      "location": "Boston, MA",
      "graduationDate": "2020-05",
      "gpa": "3.8/4.0"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"],
  "isDraft": true
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "My Resume",
  "personalInfo": { ... },
  "summary": "...",
  "experience": [...],
  "education": [...],
  "skills": [...],
  "isDraft": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**MongoDB Schema:**
```javascript
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    website: String
  },
  summary: String,
  experience: [{
    id: String,
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    id: String,
    degree: String,
    institution: String,
    location: String,
    graduationDate: String,
    gpa: String
  }],
  skills: [String],
  isDraft: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

---

### 5. Update Resume
**PUT** `/resumes/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:** (Same as Create Resume, partial updates allowed)

**Response:** (Same as Create Resume)

---

### 6. Get Resume
**GET** `/resumes/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** (Same as Create Resume response)

---

### 7. Get User's Resumes
**GET** `/resumes`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "My Resume",
    "isDraft": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 8. Delete Resume
**DELETE** `/resumes/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Resume deleted successfully"
}
```

---

## Subscription Endpoints

### 9. Create Checkout Session (Stripe)
**POST** `/subscriptions/checkout`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "plan": "premium"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

**Implementation Notes:**
- Use Stripe API to create a checkout session
- Set up webhook to handle successful payments
- Update user's subscription status when payment is confirmed

---

### 10. Get Subscription Status
**GET** `/subscriptions/status`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "subscription": "premium",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

---

## Security Requirements

1. **Password Hashing**: Use bcrypt with salt rounds of 10+
2. **JWT Secret**: Use a strong, random secret key stored in environment variables
3. **CORS**: Configure CORS to allow requests only from your frontend domain
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Input Validation**: Validate all inputs using libraries like Joi or express-validator
6. **MongoDB Injection**: Use parameterized queries and sanitize inputs

---

## Environment Variables

Create a `.env` file in your backend:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumedb
JWT_SECRET=your-super-secret-jwt-key-change-this
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:8080
```

---

## Deployment Recommendations

1. **Backend Hosting**: 
   - Vercel (Node.js)
   - Railway
   - Heroku
   - AWS EC2 / ECS
   - DigitalOcean

2. **Database**: 
   - MongoDB Atlas (recommended - free tier available)

3. **Domain**: 
   - Get a custom domain and configure SSL

---

## Testing the API

You can use tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)

---

## Next Steps

1. Set up MongoDB Atlas account
2. Create a backend project with Express.js or Flask
3. Implement the authentication endpoints first
4. Test authentication with Postman
5. Implement resume CRUD endpoints
6. Set up Stripe for payments
7. Deploy backend to a hosting service
8. Update `API_BASE_URL` in `src/services/mongoApi.ts`

---

## Support

For any questions about the API requirements, please contact the frontend team.
