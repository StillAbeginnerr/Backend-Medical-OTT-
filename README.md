# 🚀 Clinikk TV Backend (Medical OTT App)

This is the backend service for **Clinikk TV**, a medical OTT platform. The backend supports:  
✅ **User Authentication** (Sign up, log in)  
✅ **Subscription Payments** (Razorpay integration)  
✅ **Media Retrieval** (Videos from Cloudinary)  
✅ **User Subscription Management**  

---

Intuition Docs : https://docs.google.com/document/d/1p17Oas1_Fma4ejEK0SS-MCQhGJqMVojzvvgVA4-gn_Y/edit?usp=sharing

## 📂 Project Structure

# Business logic for authentication, payments, media

controllers/          
authController.js <br>
subscriptionController.js<br>
mediaController.js<br>
# Authentication middleware (JWT verification)
middleware/         
authMiddleware.js<br>
# API endpoints
routes/              
auth.js<br>
subscription.js<br>
media.js<br>
# Configuration files (Cloudinary, DB)
config/              
cloudinaryConfig.js
# Database connection file
database/           
connection.js
 # Swagger API documentation setup
swagger.js           
# Main entry point for the application
server.js             
---

## 🛠 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/clinikk-tv-backend.git
cd clinikk-tv-backend

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file and add:

PORT=3000

# PostgreSQL Database
DATABASE_URL=postgres://user:password@localhost:5432/clinikk_db

# JWT Secret
JWT_SECRET=your_jwt_secret

# Razorpay Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4️⃣ Start the Server

nodemon server.js

Server will start on:
👉 http://localhost:3000

🛠 API Endpoints

🛡 Authentication Routes

Endpoint	Method	Description
/api/signup	POST	Register a new user
/api/login	POST	Log in and receive JWT token
/api/profile	POST	Fetch user profile (Requires JWT)

💳 Payment Routes

Endpoint	Method	Description
/api/subscribe	POST	Create a Razorpay order
/api/verify-payment	POST	Verify a payment with Razorpay signature
/api/confirm-subscription	POST	Activate subscription after successful payment

🎬 Media Routes

Endpoint	Method	Description
/api/media	GET	Fetch videos from Cloudinary

📝 API Documentation (Swagger)

Swagger UI is available at:
👉 http://localhost:3000/api-docs

📌 Usage Instructions

1️⃣ Register a User

Request:

POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "User registered successfully"
}

2️⃣ Login a User

Request:

POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

🛡 Use this token for protected routes by adding:

Authorization: Bearer YOUR_TOKEN_HERE

3️⃣ Fetch Media Content

Request:

GET /api/media

Response:

{
  "media": [
    {
      "public_id": "cgr9ootab0wnt0kxxxom",
      "url": "https://res.cloudinary.com/dg3ufgyhh/video/upload/v1739280696/cgr9ootab0wnt0kxxxom.mov",
      "format": "mov",
      "created_at": "2024-02-12T10:30:00Z"
    }
  ]
}

4️⃣ Subscribe (Create Razorpay Order)

Request:

POST /api/subscribe
Content-Type: application/json

{
  "amount": 9900,
  "currency": "INR"
}

Response:

{
  "id": "order_HjI12345678",
  "amount": 9900,
  "currency": "INR",
  "status": "created"
}

5️⃣ Verify Payment

Request:

POST /api/verify-payment
Content-Type: application/json

{
  "orderId": "order_HjI12345678",
  "paymentId": "pay_Hk12345678",
  "razorpaySignature": "1a23bc4d567ef8901234gh56789ijklmn"
}

Response:

{
  "message": "Payment verification successful"
}

6️⃣ Confirm Subscription

Request:

POST /api/confirm-subscription
Content-Type: application/json

{
  "userId": 1
}

Response:

{
  "message": "Subscription activated successfully"
}

🔧 Testing & Development

✅ Run Tests

npm test

✅ Linting

npm run lint

✅ Restart Server Automatically

nodemon server.js

👨‍💻 Contributors
	•	Shivam Agarwal
	•	Your Name (if others contributed)

📜 License

This project is licensed under the MIT License.

🚀 Final Notes

✅ If you face any issues, create an issue on GitHub.
✅ For feature requests, feel free to fork & contribute!

🔥 Happy Coding! 🚀

