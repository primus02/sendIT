const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "process.env.JWT_KEY");
        req.userData = decoded;
        next();
    }catch(err){
        res.status(500).json({
            message: err
        });
    };
}