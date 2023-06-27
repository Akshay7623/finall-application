const {BetParityModel,BetSapreModel,BetBconeModel,BetEmerdModel} =  require('../model/model');
const getBet = async(req,res,next)=>{
    const server = req.body.server;
    let bet,count;
    const {lastTime,firstBetTime} = req.body;
    const type = req.body.type;
   
    switch (server) {
        case 'parity':
          if(type === 'next'){
            bet = await BetParityModel.find({$and:[{userId:req.body.userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
          }else{
            bet = await BetParityModel.find({$and:[{userId:req.body.userId},{time:{ $gt: firstBetTime }}]}).sort({time: 1}).limit(10);
          }
          count = await BetParityModel.find({userId:req.body.userId}).count();
         break;
        case 'sapre':
          if(type === 'next'){
            bet = await BetSapreModel.find({$and:[{userId:req.body.userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
          }else{
            bet = await BetSapreModel.find({$and:[{userId:req.body.userId},{time:{ $gt: firstBetTime }}]}).sort({time: 1}).limit(10);
          }
         count = await BetSapreModel.find({userId:req.body.userId}).count();
         break;
        case 'bcone':
          if(type === 'next'){
            bet = await BetBconeModel.find({$and:[{userId:req.body.userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
          }else{
            bet = await BetBconeModel.find({$and:[{userId:req.body.userId},{time:{ $gt: firstBetTime }}]}).sort({time: 1}).limit(10);
          }
          count = await BetBconeModel.find({userId:req.body.userId}).count();
          break;
        case 'emerd':
          if(type === 'next'){
            bet = await BetEmerdModel.find({$and:[{userId:req.body.userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
          }else{
            bet = await BetEmerdModel.find({$and:[{userId:req.body.userId},{time:{ $gt: firstBetTime }}]}).sort({time: 1}).limit(10);
          }
         count = await BetEmerdModel.find({userId:req.body.userId}).count(); 
         break;
        default:
          break;
      }
      
      res.json({bet:bet,count:count});

}

module.exports = {getBet};