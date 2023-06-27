const { RegisterModel } = require('../model/model');


const getReport = async(req,res,next)=>{
    
    const RefCode = req.body.referCode;

    const allReport = await RegisterModel.find({inviteCode:RefCode},{"mobile":1, "ReferCode":1,"time":1});
    res.json(allReport);
};

module.exports = {getReport};