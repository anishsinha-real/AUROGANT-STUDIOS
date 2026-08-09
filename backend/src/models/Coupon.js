import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
            default: "percentage"
        },

        discountValue: {
            type: Number,
            required: true
        },

        minimumOrderAmount: {
            type: Number,
            default: 0
        },

        maximumDiscount: {
            type: Number,
            default: 0
        },

        usageLimit: {
            type: Number,
            default: 0
        },

        usedCount: {
            type: Number,
            default: 0
        },

        expiresAt: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

couponSchema.index({ code: 1 });

export default mongoose.model("Coupon", couponSchema);