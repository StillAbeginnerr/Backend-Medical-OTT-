const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const pool = require('../database/connection.js');

const Signup = async (req, res) => {

    try {
    const {username, email, password} = req.body;
    if (!username || !email || !password)
    {
    return res.status(400).json({message: 'Please provide all required fields'});
    }

    const encryptedPassword = CryptoJS.SHA256(password).toString();
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, encryptedPassword];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    res.status(201).json({message: 'User created successfully', user});
    res.redirect('/login');

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }

}

const Login = async(req, res) => {
    try{
        const {email,password} = req.body;
        if (!email || !password){
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length === 0){
        {
            return res.status(401).json({message: 'User not found'});
        }

        const encryptedPassword = Crypto.SHA256(password).toString();
        if(user.rows[0].password !== encryptedPassword){
            return res.status(401).json({message: 'Incorrect Password'});
        }
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.cookie('token', token, { httpOnly: true });

        res.json({
            token,
            user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                  }
            });

    }catch(error){
            console.error('Error in logging in:', error);
            res.status(500).json({ error: 'Error in logging in', details: error.message });
    }
}

const Profile = async (req, res) => {
    try {
        const {userId} = req.body;

        const result = await pool.query(
            `SELECT id, username, email, subscription_status, subscription_expiry FROM users WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        // Format response
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            subscription_status: user.subscription_status ? "Active" : "Inactive",
            subscription_expiry: user.subscription_expiry || "No active subscription"
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { Profile };

module.exports.Signup = Signup;
module.exports.Profile = Profile;
module.exports.Login = Login;

