const {RegisterModel,BetRedBlackModel} = require('../model/model');

const Bet = async (req,res,next)=>{
    const userData = await RegisterModel.findOne({_id:req.body.userId});
    const amount = req.body.contract_amount;
    const color = req.body.color;
    

    function addMinutes(date, minutes) {
        const dateCopy = new Date(date);
        dateCopy.setMinutes(date.getMinutes() + minutes);
        return dateCopy;
      }
    const getMinutes = () => {
        const date = new Date();
        let diff = (new Date()).getTimezoneOffset();
        let sum = 330 + diff;
        const newDate = addMinutes(date, sum);
        return newDate.getMinutes();
      }
    const getSec = () => {
        const date = new Date();
        let diff = (new Date()).getTimezoneOffset();
        let sum = 330 + diff;
        const newDate = addMinutes(date, sum);
        return newDate.getSeconds();
      }
    const getPeriodRedBlack = () => {
        const date = new Date();
        let diff = (new Date()).getTimezoneOffset();
        let sum = 330 + diff;
        const newDate = addMinutes(date, sum);
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        let y = newDate.getFullYear();
        let m = months[newDate.getMonth()];
        let d = days[newDate.getDate()];
        const min = ((newDate.getHours()) * 60) + (newDate.getMinutes());
        let secNow = getSec();
        let minWithTwo = min*2 + Math.round(secNow/30);
        if (minWithTwo.toString().length === 1) {
          minWithTwo = `000${minWithTwo}`;
        } else if (minWithTwo.toString().length === 2) {
          minWithTwo = `00${minWithTwo}`;
        } else if(minWithTwo.toString().length === 3){
          minWithTwo = `0${minWithTwo}`;
        }
        return `${y}${m}${d}${minWithTwo}`;
      }
    
    const time = new Date().getTime();

    if(userData){

      const wallet = userData.wallet;
      const lastPeriod = userData.currentRedBlackPeriod;
      let blackRed = userData.blackRed;
      let inviteCode = userData.inviteCode;

      let currSec = getSec();
      let getPeriodBandR = getPeriodRedBlack();
      currSec = 59 - currSec;

      let bet;
      let newBlackRedArr;
      let betOnBlack = 0;
      let betOnRed = 0;

      if(currSec <=44 && currSec >=30){

        if(wallet >= amount){
          const update = await RegisterModel.updateOne({_id:req.body.userId},{$inc:{wallet:-amount}});
          
          if(color === 'red'){
            betOnRed = amount;
            newBlackRedArr = [0,amount];
          }else{
            betOnBlack = amount;
            newBlackRedArr = [amount,0];
          }

          if(lastPeriod === parseInt(getPeriodBandR)){
            newBlackRedArr = [parseInt(blackRed[0])+parseInt(betOnBlack),parseInt(blackRed[1]) + parseInt(betOnRed)];
          }

          const updateBet = await RegisterModel.updateOne({_id:req.body.userId},{blackRed:newBlackRedArr,currentRedBlackPeriod:parseInt(getPeriodBandR)});

          bet = BetRedBlackModel({userId:req.body.userId,Period:getPeriodBandR,time:time,color:req.body.color,contract_amount:amount});
          const saveBet = await bet.save();
          res.json({message:'success'});

          if(inviteCode !== ''){
            const parentData = await RegisterModel.findOne({ReferCode:inviteCode});
            if(parentData){
              const MainWallet = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet:(amount*0.015)}});
              const wallet1 = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet1:(amount*0.015)}});
              const parentInviteCode = parentData.inviteCode;
              const grandParent = await RegisterModel.findOne({ReferCode:parentInviteCode});
              if(grandParent){
                const MainWallet = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet:(amount*0.005)}});
                const wallet2 = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet2:(amount*0.005)}});                  
              }
             }
            }

        }else{
          res.json({message:'BALANCE_ERROR'});
        }


      
      }else if(currSec <= 15 && currSec >= 1){
        if(wallet >= amount){
      
          const update = await RegisterModel.updateOne({_id:req.body.userId},{$inc:{wallet:-amount}});
          if(color === 'red'){
            betOnRed = amount;
            newBlackRedArr = [0,amount];
          }else{
            betOnBlack = amount;
            newBlackRedArr = [amount,0];
          }

          if(lastPeriod === parseInt(getPeriodBandR)){
            newBlackRedArr = [parseInt(blackRed[0])+parseInt(betOnBlack),parseInt(blackRed[1]) + parseInt(betOnRed)];
          }

          const updateBet = await RegisterModel.updateOne({_id:req.body.userId},{blackRed:newBlackRedArr,currentRedBlackPeriod:parseInt(getPeriodBandR)});
          bet = BetRedBlackModel({userId:req.body.userId,Period:getPeriodBandR,time:time,color:req.body.color,contract_amount:amount});
          const saveBet = await bet.save();

          res.json({message:'success'});

          if(inviteCode !== ''){
            const parentData = await RegisterModel.findOne({ReferCode:inviteCode});
            if(parentData){
              const MainWallet = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet:(amount*0.015)}});
              const wallet1 = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet1:(amount*0.015)}});
              const parentInviteCode = parentData.inviteCode;
              const grandParent = await RegisterModel.findOne({ReferCode:parentInviteCode});
              if(grandParent){
                const MainWallet = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet:(amount*0.005)}});
                const wallet2 = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet2:(amount*0.005)}});                  
              }
             }
            }

        }else{
          res.json({message:'BALANCE_ERROR'});
        }
      }else{
        res.json({message:'timeout'});
      }

    }else{
        res.json({message:'AUTH_FAILED'});
    }

}

module.exports ={Bet};