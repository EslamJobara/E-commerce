import connectDb from "./DB/connectDB.js";
import globalErrorHandler from "./Utlis/errorHandler.utlis.js"
import cookieParser from "cookie-parser";
import authRouter from "./Modules/auth/auth.controller.js"
import productRouter from "./Modules/Product/product.controller.js"
import categoryRouter from "./Modules/Category/categort.controller.js"

const bootStrap = async (app, express) => {
    app.use(express.json())
    app.use(cookieParser());

    await connectDb()

    app.use("/api/auth", authRouter)
    app.use("/api/product", productRouter)
    app.use("/api/category", categoryRouter)


    app.all("/*dummy", (req, res, next) => {
        return next(new Error("Not found Handler !!!!", { cause: 409 }))
    })

    app.use(globalErrorHandler)

}

export default bootStrap