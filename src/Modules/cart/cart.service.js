import successResponse from "../../Utlis/successResponse.utlis.js";
import CartModel from "../../DB/model/cart.model.js"
import ProductModel from "../../DB/model/product.model.js";



export const addToCart = async (req, res, next) => {
    const { productId, quantity, variationId } = req.body;
    const userId = req.user._id; // هنجيبه من التوكن زي ما اتفقنا

    const product = await ProductModel.findById(productId);
    if (!product) return next(new Error("Product not found", { cause: 404 }));

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
        cart = await CartModel.create({
            user: userId,
            items: [{ product: productId, quantity, variationId }]
        });
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId &&
            item.variationId === variationId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, variationId });
        }

        await cart.save();
    }

    return successResponse({
        res,
        statusCode: 201,
        message: "Product added to cart",
        data: cart
    });
};

export const removeFromCart = async (req, res, next) => {
    const { productId, variationId, removeAll } = req.body;
    const userId = req.user._id;

    const cart = await CartModel.findOne({ user: userId });
    
    if (!cart) {
        return next(new Error("Cart not found", { cause: 404 }));
    }

    const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (!variationId || item.variationId?.toString() === variationId?.toString())
    );

    if (itemIndex === -1) {
        return next(new Error("Item not found in cart", { cause: 404 }));
    }

    if (removeAll || cart.items[itemIndex].quantity <= 1) {
        // حذف المنتج بالكامل
        cart.items.splice(itemIndex, 1);
    } else {
        // تقليل الكمية بواحد
        cart.items[itemIndex].quantity -= 1;
    }

    await cart.save();

    const updatedCart = await CartModel.findOne({ user: userId })
        .populate({
            path: "items.product",
            model: "Product",
            select: "name price variations"
        });

    // فلترة الـ variations
    const cartObj = updatedCart.toObject();
    cartObj.items = cartObj.items.map(item => {
        if (item.variationId && item.product && item.product.variations) {
            item.product.variations = item.product.variations.filter(
                v => v._id.toString() === item.variationId.toString()
            );
        }
        return item;
    });

    return successResponse({
        res,
        message: "Item removed from cart successfully",
        data: cartObj
    });
};

export const getMyCart = async (req, res, next) => {
    const userId = req.user._id;

    const cart = await CartModel.findOne({ user: userId })
        .populate({
            path: "items.product",
            model: "Product",
            select: "name description price stock category variations"
        });

    if (!cart || cart.items.length === 0) {
        return next(new Error("Cart is empty or not found", { cause: 404 }));
    }

    // فلترة الـ variations حسب الـ variationId المختار
    const cartObj = cart.toObject();
    cartObj.items = cartObj.items.map(item => {
        if (item.variationId && item.product && item.product.variations) {
            item.product.variations = item.product.variations.filter(
                v => v._id.toString() === item.variationId.toString()
            );
        }
        return item;
    });

    // حساب السعر الإجمالي
    let totalPrice = 0;
    cartObj.items.forEach(item => {
        if (item.product) {
            totalPrice += item.product.price * item.quantity;
        }
    });

    return successResponse({
        res,
        message: "Cart fetched successfully",
        data: {
            ...cartObj,
            totalPrice
        }
    });
};

export const clearCart = async (req, res, next) => {
    const userId = req.user._id;

    const cart = await CartModel.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } },
        { new: true }
    );

    if (!cart) {
        return next(new Error("Cart not found", { cause: 404 }));
    }

    return successResponse({
        res,
        message: "Cart cleared successfully",
        data: cart
    });
};
