import connectDb from "./DB/connectDB.js";
import globalErrorHandler from "./Utlis/errorHandler.utlis.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./Modules/auth/auth.controller.js"
import productRouter from "./Modules/Product/product.controller.js"
import categoryRouter from "./Modules/Category/categort.controller.js"
import orderRouter from "./Modules/order/order.controller.js"
import cartRouter from "./Modules/cart/cart.controller.js"

const bootStrap = async (app, express) => {
    // CORS Configuration
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:4200',
        'https://e-commerce-a6cz.onrender.com',
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            
            if (process.env.NODE_ENV !== 'production') {
                return callback(null, true);
            }
            
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type', 
            'Authorization', 
            'X-Requested-With', 
            'Accept',
            'Origin'
        ],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        maxAge: 86400,
        optionsSuccessStatus: 200
    }));

    app.options('*', cors());

    // Body parsers
    app.use(express.json({ limit: '10mb' })); // حد أقصى لحجم الـ JSON
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(cookieParser());

    await connectDb()

    // Health check endpoint (مهم لـ Render)
    app.get("/health", (req, res) => {
        const healthCheck = {
            uptime: process.uptime(),
            status: 'OK',
            timestamp: Date.now(),
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
        };
        res.status(200).json(healthCheck);
    });

    // Root endpoint
    app.get("/", (req, res) => {
        res.json({
            message: "E-Commerce API is running",
            documentation: "/api-docs",
            health: "/health"
        })
    })

    app.use("/api/auth", authRouter)
    app.use("/api/product", productRouter)
    app.use("/api/category", categoryRouter)
    app.use("/api/order", orderRouter)
    app.use("/api/cart", cartRouter)


    // 404 handler - must be after all routes
    app.use((req, res, next) => {
        return next(new Error("Not found Handler !!!!", { cause: 404 }))
    })

    app.use(globalErrorHandler)

}

export default bootStrap