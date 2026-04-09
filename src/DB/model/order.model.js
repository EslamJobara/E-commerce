import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                variationId: { type: String }, // هنخزن فيه الـ ID بتاع الـ variation
                _id: { type: Boolean, default: true }
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },

        paymentStatus: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid",
        },

        shippingDetails: {
            fullName: { type: String, required: true },
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "card", "online"],
            default: "cash",
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;