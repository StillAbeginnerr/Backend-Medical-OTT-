const Crypto = require('crypto-js');
const createHmac = require('crypto').createHmac;
const pool = require('../database/connection.js');
const razorpay = require('../config/razorpayConfig.js');

const CreatePaymentOrder = async (req, res) => {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
        return res.status(400).json({ message: "Amount and currency are required" });
    }
    try {
        const order = await razorpay.orders.create({
            amount: amount ,
            currency: currency,
            receipt: `order_${Date.now()}`,
        });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message:"Internal server error"});
    }
};


const VerifySubscriptionPayment = async (req, res) => {
    try{
        const { orderId, paymentId, razorpaySignature } = req.body;
        const generatedSignature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature === razorpaySignature) {
            res.status(200).json({ message:'Payment verification successful'});
        }else{
            res.status(400).json({ message:'Payment verification failed'});
        }

    }catch(error){
        console.error('Error verifying payment:', error);
        res.status(500).json({ message:'Internal server error'});
    }

}

const ConfirmSubscription = async (req, res) => {
    const { userId } = req.body;
    try {
        await pool.query(
            `INSERT INTO subscriptions (user_id, subscription_status, subscription_expiry)
       VALUES ($1, $2, NOW() + INTERVAL '30 days')
       ON CONFLICT (user_id)
       DO UPDATE SET subscription_status = $2, subscription_expiry = NOW() + INTERVAL '30 days'`,
            [userId, true]
        );
        res.status(200).json({ message: 'Subscription activated successfully' });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Subscription update failed' });
    }
}

module.exports.CreatePaymentOrder = CreatePaymentOrder;
module.exports.VerifySubscriptionPayment = VerifySubscriptionPayment;
module.exports.ConfirmSubscription = ConfirmSubscription;