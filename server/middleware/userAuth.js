import jwt from "jsonwebtoken";

const userAuth = async (req, resizeBy, next)=>{
    const {token} = req.cookies;
    if(!token){
        return resizeBy.json({success: false, message: 'Not Authorized Login Again'});

    }
    try {
        
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return resizeBy.json({success: false, message: 'Not Authorized. Login Again'});
        }
        next();
    } catch (error) {
        resizeBy.json({success: false, message: error.message});
    }
}

export default userAuth;