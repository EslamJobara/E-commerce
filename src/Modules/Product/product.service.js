import successResponse from "../../Utlis/successResponse.utlis.js";
import ProductModel from "../../DB/model/product.model.js"


export const createProducts = async (req, res, next) => {
    const { name, description, price, stock, category, image } = req.body
    const createProduct = await ProductModel.create({ name, description, price, stock, category, image })
    return successResponse({ res, statusCode: 201, message: "Product Create Successfully", data: createProduct })
}

export const getAllProducts = async (req, res, next) => {
    const products = await ProductModel.find()
    if (products.length === 0) {
        return next(new Error("products Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: products })
}

export const getProductById = async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModel.find({ _id: id })
    if (product.length === 0) {
        return next(new Error("product Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: product })
}


export const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!product) {
        return next(new Error("product Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "product Update successffully", data: product })
}

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModel.findOneAndDelete({ _id: id })
    if (!product) {
        return next(new Error("product Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "product Deleted Successfully" })

}