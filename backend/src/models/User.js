import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* ==========================================
   ADDRESS SCHEMA
========================================== */

const addressSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            default: "Home",
            trim: true
        },

        type: {
            type: String,
            enum: ["Home", "Office", "Other"],
            default: "Home"
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        addressLine1: {
            type: String,
            required: true,
            trim: true
        },

        addressLine2: {
            type: String,
            default: "",
            trim: true
        },

        landmark: {
            type: String,
            default: "",
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        postalCode: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            default: "India",
            trim: true
        },

        isDefault: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

/* ==========================================
   CART ITEM SCHEMA
========================================== */

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1
        }

        // Future Upgrade
        // design: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Design"
        // },
        //
        // size: String,
        // color: String,
        // priceSnapshot: Number
    },
    {
        timestamps: true
    }
);

/* ==========================================
   USER SCHEMA
========================================== */

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        avatar: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        addresses: [addressSchema],

        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],

        cart: [cartItemSchema]
    },
    {
        timestamps: true
    }
);

/* ==========================================
   HASH PASSWORD
========================================== */

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();

});

/* ==========================================
   COMPARE PASSWORD
========================================== */

userSchema.methods.comparePassword = async function (enteredPassword) {

    return bcrypt.compare(
        enteredPassword,
        this.password
    );

};

export default mongoose.model("User", userSchema);