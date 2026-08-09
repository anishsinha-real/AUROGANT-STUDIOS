import User from "../models/User.js";

/* ==========================================
   GET PROFILE
========================================== */

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("wishlist")
            .populate("cart.product");

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        res.json({

            success: true,
            user

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
   UPDATE PROFILE
========================================== */

export const updateProfile = async (req, res) => {

    try {

        const {

            firstName,
            lastName,
            phone,
            avatar

        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        if (firstName !== undefined)
            user.firstName = firstName;

        if (lastName !== undefined)
            user.lastName = lastName;

        if (phone !== undefined)
            user.phone = phone;

        if (avatar !== undefined)
            user.avatar = avatar;

        await user.save();

        res.json({

            success: true,
            message: "Profile updated successfully.",

            user: {

                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
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
   GET ALL ADDRESSES
========================================== */

export const getAddresses = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("addresses");

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        res.json({

            success: true,

            count: user.addresses.length,

            addresses: user.addresses

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
   ADD ADDRESS
========================================== */

export const addAddress = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        const {

            label,
            type,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            postalCode,
            country,
            isDefault

        } = req.body;

        if (

            !fullName ||
            !phone ||
            !addressLine1 ||
            !city ||
            !state ||
            !postalCode

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields."

            });

        }

        if (isDefault) {

            user.addresses.forEach(address => {

                address.isDefault = false;

            });

        }

        user.addresses.push({

            label,
            type,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            postalCode,
            country,
            isDefault

        });

        await user.save();

        res.status(201).json({

            success: true,
            message: "Address added successfully.",
            addresses: user.addresses

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
   UPDATE ADDRESS
========================================== */

export const updateAddress = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        const address = user.addresses.id(req.params.id);

        if (!address) {

            return res.status(404).json({

                success: false,
                message: "Address not found."

            });

        }

        Object.keys(req.body).forEach(key => {

            address[key] = req.body[key];

        });

        if (req.body.isDefault) {

            user.addresses.forEach(addr => {

                addr.isDefault = false;

            });

            address.isDefault = true;

        }

        await user.save();

        res.json({

            success: true,
            message: "Address updated successfully.",
            addresses: user.addresses

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
   DELETE ADDRESS
========================================== */

export const deleteAddress = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        const address = user.addresses.id(req.params.id);

        if (!address) {

            return res.status(404).json({

                success: false,
                message: "Address not found."

            });

        }

        address.deleteOne();

        await user.save();

        res.json({

            success: true,
            message: "Address deleted successfully.",
            addresses: user.addresses

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
   SET DEFAULT ADDRESS
========================================== */

export const setDefaultAddress = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        const address = user.addresses.id(req.params.id);

        if (!address) {

            return res.status(404).json({

                success: false,
                message: "Address not found."

            });

        }

        user.addresses.forEach(addr => {

            addr.isDefault = false;

        });

        address.isDefault = true;

        await user.save();

        res.json({

            success: true,
            message: "Default address updated.",
            addresses: user.addresses

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};