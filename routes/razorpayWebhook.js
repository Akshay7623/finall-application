const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const {AllTransactionModel,RechargeModel,RegisterModel} = require('../model/model.js');
const express = require('express');
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
const RazorpayWebhook = express.Router();


RazorpayWebhook.post('/',async(req,res)=>{
    const webhookBody = req.body;
    const webhookSignature = req.headers["x-razorpay-signature"];

    if (typeof webhookSignature === 'undefined' || typeof req.body === 'undefined') {
        res.json({ success: false });
        return;
      }
      if (req.body.toString().trim() === '' || webhookSignature.toString().trim() === '') {
        res.json({ success: false });
        return;
      }
  if (validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, webhookSecret)) {
    const order_id = webhookBody["payload"]["payment"]["entity"]["order_id"];
    const status = webhookBody["payload"]["payment"]["entity"]["status"];
    const amount = webhookBody["payload"]["payment"]["entity"]["amount"] / 100;
    const data = await RechargeModel.findOne({ order_id: order_id });

    const paymentStatus = data.paymentStatus;
    const userId = data.userId;



    if (data) {
      if (status === "captured") {
          if(paymentStatus === 0){
            await RechargeModel.updateOne({order_id:order_id},{paymentStatus:2});
            await AllTransactionModel.updateOne({order_id:order_id},{transactionStatus:1});
            await RegisterModel.updateOne({_id:userId},{$inc:{wallet:amount}});
            let user = await RegisterModel.findOne({_id:userId});

            if(user){
              if(user.bonusDone === 0){
                if(amount >=300){
                  const parentData = await RegisterModel.findOne({ReferCode:user.inviteCode});
                   if(parentData){
                       const updateParentBonus = await RegisterModel.updateOne({ReferCode:user.inviteCode},{$inc:{bonusWallet:100}});
                   }
                }
                const updateBonusDone = await RegisterModel.updateOne({_id:userId},{bonusDone:1});
               }
            }

          }
        res.status(200).send("Ok");
      }
    }else {
        await RechargeModel.updateOne({order_id:order_id},{paymentStatus:1});
        await AllTransactionModel.updateOne({order_id:order_id},{transactionStatus:2});
    }
  }else {
    res.json({ message: "auth failed" });
    return;
  }
  
});
module.exports = RazorpayWebhook;