const {ComplaintsModel} = require('../model/model');

const Complaints = async(req,res,next)=>{
    const {userId,type,contact,desc} = req.body;
    const time = new Date().getTime();
    const DoneComplaints = ComplaintsModel({userId:userId,type:type,contact:contact,desc:desc,time:time});
    const finalComplaints = await DoneComplaints.save();
    res.json({message:'success'});
}

module.exports = {Complaints};