const {addUPIModel}  = require('../model/model');
const addUPI = async(req,res,next)=>{
     const userUpi = await addUPIModel.findOne({userId:req.body.userId});
     if(userUpi){
         res.json({message:'UPI_EXIST'});
     }else{
         const upiData = addUPIModel(req.body);
         const saveData = await upiData.save();
         res.json({message:'success'});
     }
}

module.exports = {addUPI};