const {addUPIModel,addBankModel} =  require('../model/model');
const getBank = async(req,res,next)=>{

     const bankCard = await addBankModel.findOne({userId:req.body.userId});
     const upiCard = await addUPIModel.findOne({userId:req.body.userId});
 
     if(req.body.type === 'bank'){
       res.json(bankCard);
       return;
     }

     if(req.body.type === 'upi'){
        res.json(upiCard);
        return;
     }
     res.json({message:'EMPTY'});
}

module.exports = {getBank};