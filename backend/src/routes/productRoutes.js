import express from "express";

import {
    createProduct,
    getProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   PRODUCT ROUTES
========================================== */

// Public
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Admin
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);
export default router;