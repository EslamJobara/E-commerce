import { Router } from "express";
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js";
import * as orderService from "./order.service.js"

const router = Router()

/**
 * @swagger
 * /api/order/createOrder:
 *   post:
 *     summary: إنشاء طلب جديد
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - shippingAddress
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: 123 Main St
 *                   city:
 *                     type: string
 *                     example: Cairo
 *                   country:
 *                     type: string
 *                     example: Egypt
 *                   postalCode:
 *                     type: string
 *                     example: "12345"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card]
 *                 example: cash
 *     responses:
 *       201:
 *         description: تم إنشاء الطلب بنجاح
 *       400:
 *         description: خطأ في البيانات المدخلة
 *       401:
 *         description: غير مصرح - Token مطلوب
 */
router.post("/createOrder", authentication, orderService.createOrder)

/**
 * @swagger
 * /api/order/getOrderById/{id}:
 *   get:
 *     summary: الحصول على طلب بواسطة ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الطلب (MongoDB ObjectId)
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: بيانات الطلب
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       401:
 *         description: غير مصرح - Token مطلوب
 *       404:
 *         description: الطلب غير موجود
 */
router.get("/getOrderById/:id", authentication, orderService.getOrderById)

/**
 * @swagger
 * /api/order/getUserOrders:
 *   get:
 *     summary: الحصول على جميع طلبات المستخدم الحالي
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: قائمة الطلبات
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: غير مصرح - Token مطلوب
 *       404:
 *         description: لا توجد طلبات
 */
router.get("/getUserOrders", authentication, orderService.getUserOrders)

export default router