import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

    try {

        console.log("Authorization Header:", req.headers.authorization);

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        console.log("Extracted Token:", token);

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "User not found"
            });

        }

        next();

    }

    catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

/* ==========================================
   ADMIN ONLY
========================================== */

export const adminOnly = (req, res, next) => {

    if (req.user && req.user.role === "admin") {

        return next();

    }

    return res.status(403).json({

        success: false,

        message: "Admin access only"

    });

};