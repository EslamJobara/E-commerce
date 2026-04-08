import { Router } from "express";
import * as categoryService from "./categort.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";


const router = Router()

/**
 * @swagger
 * /api/category/createCategory:
 *   post:
 *     summary: إنشاء تصنيف جديد
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Electronic devices and accessories
 *     responses:
 *       201:
 *         description: تم إنشاء التصنيف بنجاح
 *       401:
 *         description: غير مصرح
 */
router.post("/createCategory", authentication, categoryService.createCategory)

/**
 * @swagger
 * /api/category/getAllCategory:
 *   get:
 *     summary: الحصول على جميع التصنيفات
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: قائمة التصنيفات
 */
router.get("/getAllCategory", authentication, categoryService.getAllCategory)

/**
 * @swagger
 * /api/category/getCategoryById/{id}:
 *   get:
 *     summary: الحصول على تصنيف بواسطة ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التصنيف
 *     responses:
 *       200:
 *         description: بيانات التصنيف
 *       404:
 *         description: التصنيف غير موجود
 */
router.get("/getCategoryById/:id", authentication, categoryService.getCategoryById)

/**
 * @swagger
 * /api/category/updateCategory/{id}:
 *   patch:
 *     summary: تحديث تصنيف
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التصنيف
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *       404:
 *         description: التصنيف غير موجود
 */
router.patch("/updateCategory/:id", authentication, categoryService.updateCategory)

/**
 * @swagger
 * /api/category/deleteCategory/{id}:
 *   delete:
 *     summary: حذف تصنيف
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التصنيف
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       404:
 *         description: التصنيف غير موجود
 */
router.delete("/deleteCategory/:id", authentication, categoryService.deleteCategory)

export default router