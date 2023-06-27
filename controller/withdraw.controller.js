const bcrypt = require('bcrypt');
const {WithdrawModel, RegisterModel, addUPIModel, addBankModel,AllTransactionModel} = require('../model/model');

const withdraw = async (req,res,next)=>{
    const getProfile = await RegisterModel.findOne({_id:req.body.userId});
    const {loginPassword,wallet} = getProfile;


    if(req.body.withdrawAmount>=230 && req.body.withdrawAmount <= wallet){
        bcrypt.compare(req.body.password,loginPassword,async function(err,result){
            if(result){
                const remain = wallet - parseInt(req.body.withdrawAmount);
                const time = new Date().getTime();
                if(req.body.type==='BANK'){
                    const { customerName,email,mobile, bankName, bankAccount,ifsc } = await addBankModel.findOne({userId:req.body.userId});
                    const updateWallet = await RegisterModel.updateOne({_id:req.body.userId},{$inc:{wallet:-(req.body.withdrawAmount)}});
                    const withdrawRecord = WithdrawModel({userId:req.body.userId,time:time,name:customerName,email:email, mobile:mobile,source:bankAccount,bankName:bankName,ifsc:ifsc, withdrawAmount:req.body.withdrawAmount});
                    const saveData = await withdrawRecord.save();
                    const  transaction = AllTransactionModel({userId:req.body.userId,type:'Withdrawal',time:time,transactionStatus:0,amount:req.body.withdrawAmount});
                    const savetransaction = await transaction.save();
                    res.json({message:'success'});
                }else{
                    const { customerName,email,mobile, upi } = await addUPIModel.findOne({userId:req.body.userId});
                    const updateWallet = await RegisterModel.updateOne({_id:req.body.userId},{$inc:{wallet:-(req.body.withdrawAmount)}});
                    const withdrawRecord = WithdrawModel({userId:req.body.userId,time:time,name:customerName,email:email, mobile:mobile,source:upi,withdrawAmount:req.body.withdrawAmount});
                    const saveData = await withdrawRecord.save();
                    const  transaction = AllTransactionModel({userId:req.body.userId,type:'Withdrawal',time:time,transactionStatus:0,amount:req.body.withdrawAmount});
                    const savetransaction = await transaction.save();
                    res.json({message:'success'});
                }
            }else{
                res.json({message:'INVALID_PASSWORD'});
            }
        });
      
    }else{
        res.json({message:'BALANCE_ERROR'});
    }
}

module.exports = {withdraw};