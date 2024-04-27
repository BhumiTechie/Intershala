// var express = require('express');
// var router = express.Router();
// const Razorpay =require('razorpay')
// var instance = new Razorpay({
//   key_id: 'NXEGfu1tTPYP44',
//   key_secret: 'YOUR_KEY_SECRET',
// });

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/create/orderId',(req,res)=>{
//   var options = {
//     amount:req.body.amount,                    // products.price * 100,   amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order_rcptid_11"
//   };
//   instance.orders.create(options, function(err, order) {
//     console.log(order);
//     res.send(order)
//   });

// })


// router.post('/api/payment/verify', (req,res)=>{
 
//    const razorpayOrderId = req.body.response.razorpay_order_id;
//    const  razorpayPaymentId = req.body.response.razorpay_payment_id;
//    const signature = req.body.response.razorpay_signature;
//    const secret = "";
//    var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
//   const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
// })

// module.exports = router;
 var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: 'NXEGfu1tTPYP44',
    key_secret: 'YOUR_KEY_SECRET',
  });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', function(req, res){
  var options = {
    amount: 500,  // amount in the smallest currency unit and smallest amount is paise so we multiply it by 100 (products.price *100 )
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order);
    console.log(req.body.name); //script mai se yha acess kr skte h req.body ka use krke
  });
})

router.post('/api/payment/verify', function(req, res){
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = 'kG5slsiucHiEd4wKYz5eq2Aw';
var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/payment-gateway/dist/utils/razorpay-utils');
const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
res.send(result);
})
module.exports = router;