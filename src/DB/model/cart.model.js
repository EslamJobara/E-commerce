import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    items: [
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
            },
            
            variationId: { 
                type: mongoose.Schema.Types.ObjectId,
                required: false 
            }
        }
    ]

}, { timestamps: true });

const CartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default CartModel;