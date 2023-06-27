const { RegisterModel } = require('../model/model');


const getReport2 = async(req,res,next)=>{
     
    const RefCode = req.body.referCode;


    let CodesArr = [];
    const allReportObj = await RegisterModel.find({inviteCode:RefCode},{"mobile":1, "ReferCode":1,"time":1});
    Object.values(allReportObj).map((val,index)=>{
        CodesArr.push(val.ReferCode); 
     });
    const allReport2 = await RegisterModel.find({inviteCode:CodesArr},{"mobile":1, "ReferCode":1,"time":1});
    res.json(allReport2);
};

module.exports = {getReport2}