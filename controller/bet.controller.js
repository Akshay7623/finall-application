const {RegisterModel,BetParityModel,BetSapreModel,BetBconeModel,BetEmerdModel} = require('../model/model');

const Bet = async (req,res,next)=>{
    const userData = await RegisterModel.findOne({_id:req.body.userId});
    if(userData){
        const wallet = userData.wallet;
        const lastPeriod = userData.currentPeriod;
        let oldParityArr = userData.parity;
        let oldSapreArr = userData.sapre;
        let oldBconeArr = userData.bcone;
        let oldEmerdArr = userData.emerd;
        let inviteCode = userData.inviteCode;
        const total = parseInt(req.body.no_of_orders)*parseInt(req.body.contract_amount);
        
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

        const getPeriod = () => {
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
            let minBythree = Math.floor(min / 3) + 1;
            if (minBythree.toString().length === 1) {
              minBythree = `00${minBythree}`;
            } else if (minBythree.toString().length === 2) {
              minBythree = `0${minBythree}`
            }
            return `${y}${m}${d}${minBythree}`;
          }
        const time = new Date().getTime();
        const Period = getPeriod();

        if(wallet >= total){
            if(getMinutes() === 0 && (59 - getSec()) <30){
                res.json({message:'TIMEOUT'});
                return;
            }
        
            const remain = wallet - total;
            const update = await RegisterModel.updateOne({_id:req.body.userId},{$inc:{wallet:-total}});
            const server = req.body.server;
            let bet;

            if(update.modifiedCount === 1){
              switch (server) {
                case 'parity':
                 bet = BetParityModel({userId:req.body.userId,Period:Period,time:time,betType:req.body.betType,value:req.body.value,no_of_orders:req.body.no_of_orders,contract_amount:req.body.contract_amount,total_amount:total});
                 
                  if(lastPeriod !== parseInt(Period)){
                    //its for the first time
  
                  let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                  let AllZero = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  
                  if(req.body.betType !== 'color'){
                    //it is number bet
                      zeroArr[req.body.value] = (total - (total*2)/100)*9;
                      await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:zeroArr,sapre:AllZero,bcone:AllZero,emerd:AllZero}});
                  }else{
                    //it is color bet
                    if(req.body.value === 'Green'){
                      zeroArr[10] = (total - (total*2)/100)*2;
                    }else if(req.body.value === 'Violet'){
                      zeroArr[11] = (total - (total*2)/100)*4.5;
                    }else{
                      zeroArr[12] = (total - (total*2)/100)*2;
                    }
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:zeroArr,sapre:AllZero,bcone:AllZero,emerd:AllZero}});
                  }

                  }else{
                    let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                    if(req.body.betType !== 'color'){
                      zeroArr[req.body.value] = (total - (total*2)/100)*9;7
                      let parity = oldParityArr.map((v,i)=>zeroArr[i]+v);
                      await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:parity}});
                    }else{
  
                      if(req.body.value === 'Green'){
                        zeroArr[10] = (total - (total*2)/100)*2;
                        }else if(req.body.value === 'Violet'){
                        zeroArr[11] = (total - (total*2)/100)*4.5;
                        }else{
                        zeroArr[12] = (total - (total*2)/100)*2;
                        }
  
                      let parity = oldParityArr.map((v,i)=>zeroArr[i]+v);
                      await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:parity}});
                      
                    }
                  }
                 break;
                case 'sapre':
                 bet = BetSapreModel({userId:req.body.userId,Period:Period,time:time,betType:req.body.betType,value:req.body.value,no_of_orders:req.body.no_of_orders,contract_amount:req.body.contract_amount,total_amount:total});
                  
                 if(lastPeriod !== parseInt(Period)){
                  //its for the first time
  
                let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                let AllZero = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  
                if(req.body.betType !== 'color'){
                  //it is number bet
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:zeroArr,bcone:AllZero,emerd:AllZero}});
                }else{
  
                  //it is color bet
                  if(req.body.value === 'Green'){
                    zeroArr[10] = (total - (total*2)/100)*2;
                  }else if(req.body.value === 'Violet'){
                    zeroArr[11] = (total - (total*2)/100)*4.5;
                  }else{
                    zeroArr[12] = (total - (total*2)/100)*2;
                  }
                  await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:zeroArr,bcone:AllZero,emerd:AllZero}});
                }
   
                 }else{
                  let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                  if(req.body.betType !== 'color'){
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;7
                    let sapre = oldSapreArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,sapre:sapre}});
                  }else{
  
                    if(req.body.value === 'Green'){
                      zeroArr[10] = (total - (total*2)/100)*2;
                      }else if(req.body.value === 'Violet'){
                      zeroArr[11] = (total - (total*2)/100)*4.5;
                      }else{
                      zeroArr[12] = (total - (total*2)/100)*2;
                      }
  
                    let sapre = oldSapreArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,sapre:sapre}});
                  }
                 }
                 
                 break;
                case 'bcone':
                 bet = BetBconeModel({userId:req.body.userId,Period:Period,time:time,betType:req.body.betType,value:req.body.value,no_of_orders:req.body.no_of_orders,contract_amount:req.body.contract_amount,total_amount:total});
                 
                 if(lastPeriod !== parseInt(Period)){
                  //its for the first time
  
                let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                let AllZero = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  
                if(req.body.betType !== 'color'){
                  //it is number bet
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:AllZero,bcone:zeroArr,emerd:AllZero}});
                }else{
  
                  //it is color bet
                  if(req.body.value === 'Green'){
                    zeroArr[10] = (total - (total*2)/100)*2;
                  }else if(req.body.value === 'Violet'){
                    zeroArr[11] = (total - (total*2)/100)*4.5;
                  }else{
                    zeroArr[12] = (total - (total*2)/100)*2;
                  }
                  await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:AllZero,bcone:zeroArr,emerd:AllZero}});
                }
   
                 }else{
                  let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                  if(req.body.betType !== 'color'){
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;7
                    let bcone = oldBconeArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,bcone:bcone}});
                  }else{
  
                    if(req.body.value === 'Green'){
                      zeroArr[10] = (total - (total*2)/100)*2;
                      }else if(req.body.value === 'Violet'){
                      zeroArr[11] = (total - (total*2)/100)*4.5;
                      }else{
                      zeroArr[12] = (total - (total*2)/100)*2;
                      }
  
                    let bcone = oldBconeArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,bcone:bcone}});
                  }
                 }
  
                 break;
                case 'emerd':
                 bet = BetEmerdModel({userId:req.body.userId,Period:Period,time:time,betType:req.body.betType,value:req.body.value,no_of_orders:req.body.no_of_orders,contract_amount:req.body.contract_amount,total_amount:total});
                
                 if(lastPeriod !== parseInt(Period)){
                  //its for the first time
  
                let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                let AllZero = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  
                if(req.body.betType !== 'color'){
                  //it is number bet
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:AllZero,bcone:AllZero,emerd:zeroArr}});
                }else{
  
                  //it is color bet
                  if(req.body.value === 'Green'){
                    zeroArr[10] = (total - (total*2)/100)*2;
                  }else if(req.body.value === 'Violet'){
                    zeroArr[11] = (total - (total*2)/100)*4.5;
                  }else{
                    zeroArr[12] = (total - (total*2)/100)*2;
                  }
                  await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,parity:AllZero,sapre:AllZero,bcone:AllZero,emerd:zeroArr}});
                }
   
                 }else{
                  let zeroArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                  if(req.body.betType !== 'color'){
                    zeroArr[req.body.value] = (total - (total*2)/100)*9;7
                    let emerd = oldEmerdArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,emerd:emerd}});
                  }else{
  
                    if(req.body.value === 'Green'){
                      zeroArr[10] = (total - (total*2)/100)*2;
                      }else if(req.body.value === 'Violet'){
                      zeroArr[11] = (total - (total*2)/100)*4.5;
                      }else{
                      zeroArr[12] = (total - (total*2)/100)*2;
                      }
  
                    let emerd = oldEmerdArr.map((v,i)=>zeroArr[i]+v);
                    await RegisterModel.updateOne({_id:req.body.userId},{$set:{currentPeriod:Period,emerd:emerd}});
                  }
                 }
  
                  break;
                default:
                  break;
              }
              const saveBet = await bet.save();
              res.json({message:'success',remain:remain});

              if(inviteCode !== ''){
                const parentData = await RegisterModel.findOne({ReferCode:inviteCode});
                if(parentData){
                  const MainWallet = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet:(total*0.015)}});
                  const wallet1 = await RegisterModel.updateOne({ReferCode:inviteCode},{$inc:{bonusWallet1:(total*0.015)}});
                  const parentInviteCode = parentData.inviteCode;
                  const grandParent = await RegisterModel.findOne({ReferCode:parentInviteCode});
                  if(grandParent){
                    const MainWallet = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet:(total*0.005)}});
                    const wallet2 = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{bonusWallet2:(total*0.005)}});                  
                  }
                 }
                }
            }
        }else{
            res.json({message:'BALANCE_ERROR'});
        }

    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

module.exports ={Bet};