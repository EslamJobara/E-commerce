import { Router } from "express";
import * as productService from "./product.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";


const router = Router()

/**
 * @swagger
 * /api/product/createProduct:
 *   post:
 *     summary: إنشاء منتج جديد
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Latest iPhone model
 *               price:
 *                 type: number
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: تم إنشاء المنتج بنجاح
 */
router.post("/createProduct", productService.createProducts)

/**
 * @swagger
 * /api/product/getAllProducts:
 *   get:
 *     summary: الحصول على جميع المنتجات
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: قائمة المنتجات
 */
router.get("/getAllProducts", productService.getAllProducts)

/**
 * @swagger
 * /api/product/getProductById/{id}:
 *   get:
 *     summary: الحصول على منتج بواسطة ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المنتج
 *     responses:
 *       200:
 *         description: بيانات المنتج
 *       404:
 *         description: المنتج غير موجود
 */
router.get("/getProductById/:id", productService.getProductById)

/**
 * @swagger
 * /api/product/updateProduct/{id}:
 *   patch:
 *     summary: تحديث منتج
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المنتج
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *       404:
 *         description: المنتج غير موجود
 */
router.patch("/updateProduct/:id", productService.updateProduct)

/**
 * @swagger
 * /api/product/deleteProduct/{id}:
 *   delete:
 *     summary: حذف منتج
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المنتج
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       404:
 *         description: المنتج غير موجود
 */
router.delete("/deleteProduct/:id", productService.deleteProduct)

export default router