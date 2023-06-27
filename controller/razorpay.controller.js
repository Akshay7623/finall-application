const Razorpay = require("razorpay");
const crypto = require("crypto");
const {RechargeModel,AllTransactionModel} = require('../model/model');

const razorpayRecharge = async(req,res,next)=>{

    try {
		const instance = new Razorpay({
			key_id: 'rzp_test_7dTnlQKDEIWupg',
			key_secret:'nRUJRyZpFMiH2INNGnGj6ZPt', });

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, async (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
            const RechareData =  RechargeModel({userId:req.body.userId,order_id:order.id,mobile:9999999999,upi:'from@upi',email:'test@gmail.com', time:order.created_at,rechargeAmount:order.amount_due/100,toUpi:'to@upi'});
            const saveData = await RechareData.save();
            const  transaction = AllTransactionModel({userId:req.body.userId,order_id:order.id,type:'Recharge',time:order.created_at,transactionStatus:0,amount:order.amount_due/100});
            const savetransaction = await transaction.save();
			res.status(200).json({ data: order });

		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}

module.exports = {razorpayRecharge};