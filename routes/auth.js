const express = require("express");
const { Signup, Login, Profile } = require("../controllers/authController.js");
const { verifyJwt } = require("../middleware/authMiddleware.js");

const router = express.Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request (Missing required fields)
 */
router.post("/signup/", Signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized (Invalid credentials)
 */
router.post("/login/", Login);

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Fetch user profile
 *     description: Retrieves user profile information (excluding password). Requires authentication.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 username:
 *                   type: string
 *                   example: "John Doe 2"
 *                 email:
 *                   type: string
 *                   example: "john.doe2@example.com"
 *                 subscription_status:
 *                   type: string
 *                   example: "Inactive"
 *                 subscription_expiry:
 *                   type: string
 *                   example: "No active subscription"
 *       401:
 *         description: Unauthorized (Invalid token or missing authentication)
 */
router.post("/profile/", verifyJwt, Profile);

module.exports = router;