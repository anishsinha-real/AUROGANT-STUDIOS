import slugify from "slugify";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

/* ==========================================
   CREATE PRODUCT
========================================== */

export const createProduct = async (req, res) => {

    try {
        


        const {
            name,
            description,
            category,
            brand = "AURØGANT",
            price,
            comparePrice = 0,
            stock = 0,
            sku,
            sizes = [],
            colors = [],
            tags = [],
            images = [],
            isFeatured = false,
            isNewArrival = false
        } = req.body;

        console.log("BODY:", req.body);
        console.log("Category:", category);

        /* ---------- Validation ---------- */

        if (
            !name ||
            !description ||
            !category ||
            !price ||
            images.length === 0
        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields."

            });

        }

        /* ---------- Category ---------- */

        const categoryExists = await Category.findById(category);
        console.log("Category found:", categoryExists);
        
        if (!categoryExists) {

            return res.status(404).json({

                success: false,
                message: "Category not found."

            });

        }

        /* ---------- Slug ---------- */

        let slug = slugify(name, {

            lower: true,
            strict: true

        });

        const slugExists = await Product.findOne({ slug });

        if (slugExists) {

            slug = `${slug}-${Date.now()}`;

        }

        /* ---------- Discount ---------- */

        let discount = 0;

        if (comparePrice > price) {

            discount = Math.round(

                ((comparePrice - price) / comparePrice) * 100

            );

        }

        /* ---------- Create Product ---------- */

        const product = await Product.create({

            name,
            slug,
            description,
            category,
            brand,
            price,
            comparePrice,
            discount,
            stock,
            sku,
            sizes,
            colors,
            tags,
            images,
            isFeatured,
            isNewArrival

        });

        res.status(201).json({

            success: true,
            message: "Product created successfully.",
            product

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
   GET ALL PRODUCTS
========================================== */

export const getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {
            isActive: true
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.featured === "true") {
            filter.isFeatured = true;
        }

        if (req.query.newArrival === "true") {
            filter.isNewArrival = true;
        }

        let sort = {
            createdAt: -1
        };

        switch (req.query.sort) {

            case "priceAsc":
                sort = { price: 1 };
                break;

            case "priceDesc":
                sort = { price: -1 };
                break;

            case "name":
                sort = { name: 1 };
                break;

            case "oldest":
                sort = { createdAt: 1 };
                break;

            default:
                sort = { createdAt: -1 };

        }

        const products = await Product.find(filter)
            .populate("category", "name slug")
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        res.json({

            success: true,

            page,

            totalPages: Math.ceil(totalProducts / limit),

            totalProducts,

            count: products.length,

            products

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
   GET SINGLE PRODUCT BY SLUG
========================================== */

export const getProductBySlug = async (req, res) => {

    try {

        const product = await Product.findOne({

            slug: req.params.slug,
            isActive: true

        })
        .populate("category", "name slug")
        .populate("reviews.user", "firstName lastName avatar");

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found."

            });

        }

        res.json({

            success: true,
            product

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
   UPDATE PRODUCT
========================================== */

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const {
            name,
            description,
            category,
            brand,
            price,
            comparePrice,
            stock,
            sku,
            sizes,
            colors,
            tags,
            images,
            isFeatured,
            isNewArrival,
            isActive
        } = req.body;

        if (category) {
            const categoryExists = await Category.findById(category);

            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found."
                });
            }
        }

        // Regenerate slug if name changes
        if (name && name !== product.name) {

            let slug = slugify(name, {
                lower: true,
                strict: true
            });

            const slugExists = await Product.findOne({
                slug,
                _id: { $ne: product._id }
            });

            if (slugExists) {
                slug = `${slug}-${Date.now()}`;
            }

            product.slug = slug;
            product.name = name;
        }

        product.description = description ?? product.description;
        product.category = category ?? product.category;
        product.brand = brand ?? product.brand;
        product.price = price ?? product.price;
        product.comparePrice = comparePrice ?? product.comparePrice;
        product.stock = stock ?? product.stock;
        product.sku = sku ?? product.sku;
        product.sizes = sizes ?? product.sizes;
        product.colors = colors ?? product.colors;
        product.tags = tags ?? product.tags;
        product.images = images ?? product.images;
        product.isFeatured = isFeatured ?? product.isFeatured;
        product.isNewArrival = isNewArrival ?? product.isNewArrival;
        product.isActive = isActive ?? product.isActive;

        // Recalculate discount
        if (product.comparePrice > product.price) {

            product.discount = Math.round(
                ((product.comparePrice - product.price) /
                    product.comparePrice) * 100
            );

        } else {

            product.discount = 0;

        }

        await product.save();

        res.json({
            success: true,
            message: "Product updated successfully.",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
/* ==========================================
   DELETE PRODUCT (SOFT DELETE)
========================================== */

export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        product.isActive = false;
        product.deletedAt = new Date();

        await product.save();

        res.json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};