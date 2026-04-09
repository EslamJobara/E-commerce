import joi from "joi";

// Validation schema لإنشاء طلب
export const createOrderSchema = joi.object({
    items: joi.array().min(1).items(
        joi.object({
            product: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                "string.pattern.base": "Invalid product ID format",
                "any.required": "Product ID is required"
            }),
            quantity: joi.number().min(1).required().messages({
                "number.min": "Quantity must be at least 1",
                "any.required": "Quantity is required"
            }),
            variationId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
                "string.pattern.base": "Invalid variation ID format"
            })
        })
    ).required().messages({
        "array.min": "At least one item is required",
        "any.required": "Items are required"
    }),
    shippingDetails: joi.object({
        fullName: joi.string().required().messages({
            "any.required": "Full name is required"
        }),
        streetAddress: joi.string().required().messages({
            "any.required": "Street address is required"
        }),
        city: joi.string().required().messages({
            "any.required": "City is required"
        }),
        postalCode: joi.string().required().messages({
            "any.required": "Postal code is required"
        }),
        phoneNumber: joi.string().required().messages({
            "any.required": "Phone number is required"
        })
    }).required().messages({
        "any.required": "Shipping details are required"
    }),
    paymentMethod: joi.string().valid("cash", "card", "online").optional().default("cash")
}).required();

// Validation schema للـ MongoDB ObjectId
export const mongoIdSchema = joi.object({
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid ID format",
        "any.required": "ID is required"
    })
}).required();

// Validation schema للـ query parameters في getAllOrders
export const getAllOrdersQuerySchema = joi.object({
    status: joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
    paymentStatus: joi.string().valid("paid", "unpaid").optional(),
    page: joi.number().min(1).optional().default(1),
    limit: joi.number().min(1).max(100).optional().default(10)
}).optional();

// Validation schema لتحديث حالة الطلب
export const updateOrderStatusSchema = joi.object({
    status: joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").required().messages({
        "any.required": "Status is required",
        "any.only": "Invalid status value"
    })
}).required();
