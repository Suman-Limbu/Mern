import { verifyJWT } from "../utils/jwt.js";

const auth=async(req,res,next)=>{
const cookie=req.headers.cookie;
const authToken=cookie.split("=")[1];
try{
    await verifyJWT(authToken);
next();
}catch(error){
    res.status(401).send("user not authenticated.")
}
};
export default auth;