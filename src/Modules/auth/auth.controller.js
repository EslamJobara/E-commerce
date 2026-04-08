import { Router } from "express";
import * as authServeice from "./auth.service.js"
import { signUpValidation } from "./auth.validation.js";
import { validation } from "../../Middelwares/validation.middelwares.js";
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";

const router = Router()

/**
 * @swagger
 * /api/auth/signUp:
 *   post:
 *     summary: تسجيل مستخدم جديد
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed Ali
 *               email:
 *                 type: string
 *                 example: ahmed@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: تم التسجيل بنجاح
 *       400:
 *         description: خطأ في البيانات المدخلة
 */
router.post("/signUp", validation(signUpValidation), authServeice.signUp)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: تسجيل الدخول
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ahmed@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول بنجاح
 *       401:
 *         description: بيانات الدخول غير صحيحة
 */
router.post("/login", authServeice.login)

/**
 * @swagger
 * /api/auth/getAlluser:
 *   get:
 *     summary: الحصول على جميع المستخدمين (Admin فقط)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: قائمة المستخدمين
 *       401:
 *         description: غير مصرح
 *       403:
 *         description: ليس لديك صلاحية
 */
router.get("/getAlluser", authentication, authorization({ role: ["admin"] }), authServeice.getAllUsers)


export default router