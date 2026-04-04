import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        fullName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema)

export default UserModel