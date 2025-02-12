const Joi = require("joi");

// ✅ Signup Validation Schema
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name is required.",
        "string.min": "Name should be at least 3 characters long.",
        "string.max": "Name should not exceed 30 characters."
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address."
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password should be at least 6 characters long."
    })
});

// ✅ Login Validation Schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address."
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password should be at least 6 characters long."
    })
});

// ✅ Subscription Validation Schema
const subscriptionSchema = Joi.object({
    amount: Joi.number().min(1).required().messages({
        "number.base": "Amount must be a number.",
        "number.min": "Amount should be at least 1.",
        "any.required": "Amount is required."
    }),
    currency: Joi.string().valid("INR", "USD", "EUR").required().messages({
        "any.only": "Currency must be INR, USD, or EUR.",
        "any.required": "Currency is required."
    })
});

// ✅ Payment Verification Schema
const paymentVerificationSchema = Joi.object({
    orderId: Joi.string().required().messages({
        "string.empty": "Order ID is required."
    }),
    paymentId: Joi.string().required().messages({
        "string.empty": "Payment ID is required."
    }),
    razorpaySignature: Joi.string().required().messages({
        "string.empty": "Razorpay signature is required."
    })
});

// ✅ Profile Validation Schema
const profileSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        "number.base": "User ID must be a number.",
        "any.required": "User ID is required."
    })
});

// ✅ Middleware to Validate Requests
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map((err) => err.message)
        });
    }

    next();
};

module.exports = {
    signupSchema,
    loginSchema,
    subscriptionSchema,
    paymentVerificationSchema,
    profileSchema,
    validate
};