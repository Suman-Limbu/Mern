import userServices from "../services/userService.js";

const createUser =async (req,res)=>{

try{
    const data= await userServices.createUser(req.body);
res.status(201).json(data);
}catch(error){
    res.status(500).send(error.message);
}
};


const getUser =async (req,res)=>{

    const data= await userServices.getUser();
res.json(data);
};



export default { createUser,getUser};