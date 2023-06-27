const { RegisterModel } = require('../model/model');


const getPromotionReport = async (req,res,next)=>{
    const RefCode = req.body.referCode;
    let CodesArr = [];


    const allReport = await RegisterModel.find({inviteCode:RefCode},{"mobile":1, "ReferCode":1,"time":1}).count();
   
    const allReportObj = await RegisterModel.find({inviteCode:RefCode},{"mobile":1, "ReferCode":1,"time":1});
    Object.values(allReportObj).map((val,index)=>{
        CodesArr.push(val.ReferCode); 
     });

    const allReport2 = await RegisterModel.find({inviteCode:CodesArr},{"mobile":1, "ReferCode":1,"time":1}).count();
    res.json({level1:allReport,level2:allReport2});


}

module.exports = {getPromotionReport};