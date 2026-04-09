import successResponse from "../../Utlis/successResponse.utlis.js";
import CategoryModel from "../../DB/model/Category.model.js"

export const createCategory = async (req, res, next) => {
    const { name } = req.body

    const category = await CategoryModel.findOne({ name })
    if (category) {
        return next(new Error("category already exists", { cause: 409 }))
    }

    const createCategory = await CategoryModel.create({ name })

    return successResponse({ res, statusCode: 201, message: "Category Create Successfully", data: { createCategory } })

}

export const getAllCategory = async (req, res, next) => {
    const category = await CategoryModel.find()
    // Return empty array if no categories found (not an error)
    return successResponse({ 
        res, 
        statusCode: 200, 
        message: "successfully", 
        data: category 
    })
}

export const getCategoryById = async (req, res, next) => {
    const { id } = req.params
    const category = await CategoryModel.find({ _id: id })
    if (category.length === 0) {
        return next(new Error("category Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: category })
}

export const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const category = await CategoryModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!category) {
        return next(new Error("category Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "category Update successffully", data: category })
}

export const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    const category = await CategoryModel.findOneAndDelete({ _id: id })
    if (!category) {
        return next(new Error("category Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "category Deleted Successfully" })

}
