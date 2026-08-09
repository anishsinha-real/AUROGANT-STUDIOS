import express from "express";

import {
    getProfile,
    updateProfile,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   USER PROFILE
========================================== */

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfile
);

/* ==========================================
   USER ADDRESSES
========================================== */

router.get(
    "/addresses",
    protect,
    getAddresses
);

router.post(
    "/addresses",
    protect,
    addAddress
);

router.put(
    "/addresses/:id",
    protect,
    updateAddress
);

router.delete(
    "/addresses/:id",
    protect,
    deleteAddress
);

router.patch(
    "/addresses/:id/default",
    protect,
    setDefaultAddress
);

export default router;