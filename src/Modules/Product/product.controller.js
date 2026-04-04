import { Router } from "express";
import * as productService from "./product.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";


const router = Router()

router.post("/createProduct", productService.createProducts)

router.get("/getAllProducts", productService.getAllProducts)

router.get("/getProductById/:id", productService.getProductById)

router.patch("/updateProduct/:id", productService.updateProduct)

router.delete("/deleteProduct/:id", productService.deleteProduct)

export default router