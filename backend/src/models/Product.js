import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true,
        _id: false
    }
);

const productSchema = new mongoose.Schema(
    {
        /* ==========================================
           BASIC INFORMATION
        ========================================== */

        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            default: "AURØGANT",
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        tags: [
            {
                type: String,
                trim: true
            }
        ],

        /* ==========================================
           PRICING
        ========================================== */

        price: {
            type: Number,
            required: true,
            min: 0
        },

        comparePrice: {
            type: Number,
            default: 0,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        /* ==========================================
           INVENTORY
        ========================================== */

        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        sold: {
            type: Number,
            default: 0,
            min: 0
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
            trim: true
        },

        /* ==========================================
           PRODUCT OPTIONS
        ========================================== */

        sizes: [
            {
                type: String,
                enum: [
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ]
            }
        ],

        colors: [
            {
                type: String,
                trim: true
            }
        ],

        /* ==========================================
           IMAGES
        ========================================== */

        images: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "At least one product image is required."
            }
        },

        /* ==========================================
           STATUS
        ========================================== */

        isFeatured: {
            type: Boolean,
            default: false
        },

        isNewArrival: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        deletedAt: {
            type: Date,
            default: null
        },

        /* ==========================================
           RATINGS
        ========================================== */

        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        totalReviews: {
            type: Number,
            default: 0
        },

        reviews: [reviewSchema]
    },
    {
        timestamps: true
    }
);

/* ==========================================
   INDEXES
========================================== */


productSchema.index({ category: 1 });

productSchema.index({ price: 1 });

productSchema.index({ isFeatured: 1 });

productSchema.index({ isNewArrival: 1 });

productSchema.index({ isActive: 1 });

productSchema.index({ sold: -1 });

productSchema.index({ averageRating: -1 });

productSchema.index({
    name: "text",
    description: "text",
    tags: "text"
});

export default mongoose.model("Product", productSchema);