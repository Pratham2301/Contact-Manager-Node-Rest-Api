const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = (asyncHandler((req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.TOKEN_SECRET,

            (err, decoded) => {

                if (err) {
                    res.status(401);
                    throw new Error("User is not authorized");
                }
                

                req.user = decoded;

                // console.log("decoded : ", decoded)

                next();
            });

    }
    else {
        res.status(401);
        throw new Error("Token is missing");
    }


}
));

module.exports = validateToken;