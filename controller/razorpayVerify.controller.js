const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayVerify = async(req,res,next)=>{
    {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto.createHmac("sha256","nRUJRyZpFMiH2INNGnGj6ZPt").update(sign.toString()).digest("hex");
    
            if (razorpay_signature === expectedSign) {
                console.log('payment succed');
                return res.status(200).json({ message: "Payment verified successfully" });
            } else {
                console.log('payment failed');
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }
}

module.exports = {razorpayVerify};