const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SALT_ROUNDS = 10;

exports.register = async(req, res) => {
    const {email, password} = req.body;

    if (!password || password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    try {
        const existing = await User.findOne({email});

        if(existing) return res.status(409).json({ error: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({
            email, 
            password: hashedPassword
        })

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:'7d' });
        console.log("register successful");
        res.status(201).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({error: "Invalid credentials"});

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log("login successful");
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};