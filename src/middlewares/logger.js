const logger=(req,res,next)=>{
const method=req.method;
const route=req.originalUrl;

console.log(`method:${method} &Url:${route}`);
next();
};

export default logger;