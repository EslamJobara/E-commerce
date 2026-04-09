import { verifyTokin } from "../Utlis/token.utlis.js";
import UserModel from "../DB/model/User.model.js";


export const authentication = async (req, res, next) => {
    let token = req.headers.authorization || req.cookies.accessToken;
    
    if (!token) {
        return next(new Error("Token required!", { cause: 401 }));
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    if (!token || token === 'null' || token === 'undefined') {
        return next(new Error("Token required!", { cause: 401 }));
    }

    try {
        const decoded = verifyTokin({ token });
        
        if (!decoded || !decoded._id) {
            return next(new Error("Invalid Token", { cause: 401 }));
        }

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return next(new Error("User Not Found", { cause: 404 }));
        }

        req.user = user;
        return next();
    } catch (err) {
        return next(new Error("Invalid Token", { cause: 401 }));
    }
}

export const authorization = (...allowedRoles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return next(new Error("User not authenticated", { cause: 401 }));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new Error("Forbidden - You don't have permission to access this resource", { cause: 403 }));
        }
        
        return next();
    }
}