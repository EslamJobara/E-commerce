import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
    // If already connected, reuse the connection
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("✅ Using existing database connection");
        return;
    }

    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        console.log("📡 Connecting to MongoDB...");
        const db = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        });

        isConnected = true;
        console.log(`✅ Database Connected: ${db.connection.host}`);

    } catch (error) {
        console.error("❌ Database connection Error:", error.message);
        isConnected = false;
        throw error;
    }
}

export default connectDb;