import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* ==========================================
   REGISTER
========================================== */

export const registerUser = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* ==========================================
   LOGIN
========================================== */

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/* ==========================================
   GET CURRENT USER
========================================== */

export const getMe = async (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

};