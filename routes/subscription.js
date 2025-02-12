const express = require("express");
const router = express.Router();

const { CreatePaymentOrder, VerifySubscriptionPayment, ConfirmSubscription } = require("../controllers/subscriptionController.js");

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Create a Razorpay order
 *     description: Generates a new order for subscription payments.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 9900
 *               currency:
 *                 type: string
 *                 example: "INR"
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "order_HjI12345678"
 *                 entity:
 *                   type: string
 *                   example: "order"
 *                 amount:
 *                   type: integer
 *                   example: 9900
 *                 currency:
 *                   type: string
 *                   example: "INR"
 *                 status:
 *                   type: string
 *                   example: "created"
 *       400:
 *         description: Bad request (missing required fields)
 */
router.post("/subscribe/", CreatePaymentOrder);

/**
 * @swagger
 * /api/verify-payment:
 *   post:
 *     summary: Verify a payment
 *     description: Validates the Razorpay payment using a generated signature.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "order_HjI12345678"
 *               paymentId:
 *                 type: string
 *                 example: "pay_Hk12345678"
 *               razorpaySignature:
 *                 type: string
 *                 example: "1a23bc4d567ef8901234gh56789ijklmn"
 *     responses:
 *       200:
 *         description: Payment verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment verification successful"
 *       400:
 *         description: Payment verification failed
 */
router.post("/verify-payment/", VerifySubscriptionPayment);

/**
 * @swagger
 * /api/confirm-subscription:
 *   post:
 *     summary: Confirm user subscription
 *     description: Updates the user's subscription status after a successful payment.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Subscription activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription activated successfully"
 *       500:
 *         description: Subscription update failed
 */
router.post("/confirm-subscription/", ConfirmSubscription);

module.exports = router;