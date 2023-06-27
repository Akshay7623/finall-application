const {addUPIModel } = require('../model/model');
const updateUPI = async(req,res,next)=>{

    const {upi, customerName, mobile, email} = req.body;

    const userBank = await addUPIModel.findOne({userId:req.body.userId});
    if(userBank){
        const update = await addUPIModel.updateOne({userId:req.body.userId},{upi:upi,customerName:customerName,mobile:mobile,email:email})
        res.json({message:'success'});
    }else{
        res.json({message:"UPI_NOT_EXIST"});
    }
}

module.exports = {updateUPI};