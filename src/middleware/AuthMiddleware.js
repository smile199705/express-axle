// auth-AuthMiddleware.js

// import jwt from 'jsonwebtoken'

class AuthMiddleware {
    // static authenticate(req, res, next) {
    //     const token = req.headers.authorization;
    //     if (!token) {
    //         return Response.error(res, 'Authorization required', 401);
    //     }
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         req.userId = decoded.userId;
    //         next();
    //     } catch (err) {
    //         return Response.error(res, 'Invalid authorization token', 401);
    //     }
    // }
}

export default AuthMiddleware
