import { Router } from "express";
import * as authServeice from "./auth.service.js"
import { signUpValidation } from "./auth.validation.js";
import { validation } from "../../Middelwares/validation.middelwares.js";
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";

const router = Router()

router.post("/signUp", validation(signUpValidation), authServeice.signUp)

router.post("/login", authServeice.login)

router.get("/getAlluser", authentication, authorization({ role: ["admin"] }), authServeice.getAllUsers)


export default router