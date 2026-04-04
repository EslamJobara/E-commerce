import { Router } from "express";
import * as categoryService from "./categort.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";


const router = Router()

router.post("/createCategory", authentication, categoryService.createCategory)

router.get("/getAllCategory", authentication, categoryService.getAllCategory)

router.get("/getCategoryById/:id", authentication, categoryService.getCategoryById)

router.patch("/updateCategory/:id", authentication, categoryService.updateCategory)

router.delete("/deleteCategory/:id", authentication, categoryService.deleteCategory)

export default router