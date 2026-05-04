import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Database connected successfully");

    } catch (error) {
        console.error("❌ Database connection Error:", error.message);
        // في production، لو فشل الاتصال بالـ DB، ارمي الـ error عشان Vercel يظهرها في الـ logs
        if (process.env.NODE_ENV === 'production') {
            console.error("Database connection failure detected in production");
        }

        throw error; // رمي الـ error عشان الـ bootstrap يعرف في مشكلة
    }
}

export default connectDb