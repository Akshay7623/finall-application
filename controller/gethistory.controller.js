const {ParityModel,SapreModel,BconeModel,EmerdModel} = require('../model/model');

const getHistory = async(req,res,next)=>{
  let result;
  
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

  let currPeriod = getPeriod();

  const parityResult = await ParityModel.find({show:1},{BetMoney:0}).sort({Period:-1}).limit(100);
  const sapreResult = await SapreModel.find({show:1},{BetMoney:0}).sort({Period:-1}).limit(100);
  const bconeResult = await BconeModel.find({show:1},{BetMoney:0}).sort({Period:-1}).limit(100);
  const emerdResult = await EmerdModel.find({show:1},{BetMoney:0}).sort({Period:-1}).limit(100);
  res.json({result:{parityResult:parityResult,sapreResult:sapreResult,bconeResult:bconeResult,emerdResult:emerdResult}});
}

module.exports = {getHistory};