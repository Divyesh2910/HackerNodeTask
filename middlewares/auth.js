const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");


exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new errorHandler("Please Login to Access.", 401))
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    
    req.id = id;

    next();
}); 
// 