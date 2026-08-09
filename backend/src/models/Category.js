import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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
            default: "",
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        sortOrder: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

/* ==========================================
   INDEXES
========================================== */


categorySchema.index({ sortOrder: 1 });

categorySchema.index({ parentCategory: 1 });

export default mongoose.model("Category", categorySchema);