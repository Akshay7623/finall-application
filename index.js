require('dotenv').config();
require('./config');
const express  = require('express');
const cors = require('cors');
const loginRoute = require('./routes/loginRoute.js');
const registerRoute = require('./routes/registerRoute');
const sendOtpRoute  = require('./routes/sendotpRoute');
const authuserRoute  = require('./routes/authuserRoute');
const forgotsendRoute  = require('./routes/forgotsendRoute.js');
const submitForgotRoute  = require('./routes/submitforgotRoute.js');
const getProfileRoute  = require('./routes/getprofileRoute.js');
const addBankRoute  = require('./routes/addbankRoute.js');
const addUpiRoute  = require('./routes/addupiRoute.js');
const showBankRoute  = require('./routes/showbankRoute.js');
const getBankRoute  = require('./routes/getbankRoute.js');
const updateBankRoute  = require('./routes/updatebankRoute.js');
const updateUPIRoute  = require('./routes/updateupiRoute.js');
const resetPassRoute = require('./routes/resetpassRoute.js');
const rechargeRoute = require('./routes/rechargeRoute.js');
const getKYCRoute = require('./routes/getkycRoute.js');
const withdrawRoute = require('./routes/withdrawRoute.js');
const reportRoute = require('./routes/reportRoute.js');
const report2Route = require('./routes/report2Route.js');
const PromotionReportRoute = require('./routes/promotionreportRoute.js');
const betRoute = require('./routes/betRoute.js');
const getbetRoute = require('./routes/getbetRoute.js');
const getResultRoute = require('./routes/getResultRoute.js');
const complaintsRoute = require('./routes/complaintsRoute.js');
const rechargeRecordRoute = require('./routes/rechargeRecordRoute.js');
const withdrawRecordRoute = require('./routes/withdrawRecordRoute.js');
const transactionRoute =  require('./routes/transactionRoute.js');
const getSuggestionRoute = require('./routes/getSuggestionRoute.js');
const applyBonusRoute = require('./routes/applyBonusRoute.js');
const downloadAppRoute = require('./routes/downloadRoute.js');
const MakeRedBlackBet = require('./routes/makeRedBlackBetRoute.js');
const MakeRazorpay = require('./routes/makeRazorpayRoute.js');
const MakeRazorpayVerify = require('./routes/makeRazorpayVerifyRoute.js');
const razorpayWebook = require('./routes/razorpayWebhook.js');
const {AdminDataModel} = require('./model/model');
const path = require('path');
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

// const getAdminDataNumber = async()=>{
//     return await AdminDataModel.find().count();
// }
// let adminNumber = getAdminDataNumber();
// const saveAdmin = async()=>{
//     const adminData = AdminDataModel({userName : "merakki123@gmail.com",password : "Akki@9978111363",Tried :0});
//     const saveData = await adminData.save();
// }
// if(adminNumber  === 0){
//     saveAdmin();
// }

app.use('/api/register',registerRoute);
app.use('/api/sendotp',sendOtpRoute);
app.use('/api/login',loginRoute);
app.use('/api/authuser',authuserRoute);
app.use('/api/forgotsend',forgotsendRoute);
app.use('/api/submitforgot',submitForgotRoute);
app.use('/api/getprofile',getProfileRoute);
app.use('/api/addbank',addBankRoute);
app.use('/api/addupi',addUpiRoute);
app.use('/api/getbankcard',showBankRoute);
app.use('/api/getbank',getBankRoute);
app.use('/api/updatebank',updateBankRoute);
app.use('/api/updateupi',updateUPIRoute);
app.use('/api/resetpass',resetPassRoute);
app.use('/api/recharge',rechargeRoute);
app.use('/api/getkyc',getKYCRoute);
app.use('/api/withdraw',withdrawRoute);
app.use('/api/getreport',reportRoute);
app.use('/api/getreport2',report2Route);
app.use('/api/promotionreport',PromotionReportRoute);
app.use('/api/bet',betRoute);
app.use('/api/getbetrecords',getbetRoute);
app.use('/api/gethistory',getResultRoute);
app.use('/api/complaints',complaintsRoute);
app.use('/api/rechargerecord',rechargeRecordRoute);
app.use('/api/withdrawrecord',withdrawRecordRoute);
app.use('/api/gettransaction',transactionRoute);
app.use('/api/getsuggestion',getSuggestionRoute);
app.use('/api/applybonus',applyBonusRoute);
app.use('/api/download',downloadAppRoute);
app.use('/api/make_red_black_bet',MakeRedBlackBet);
app.use('/api/razorpay/orders',MakeRazorpay);
app.use('/api/razorpay/verify',MakeRazorpayVerify);
app.use('/api/razorpay/webhook',razorpayWebook);

app.use(express.static(__dirname + '/build'));
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});
