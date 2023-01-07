import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";
import * as dotenv from 'dotenv';
import Order from "../models/orderModel.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_232b4afd3a55fa8717d190d3d4f5b9bc0a96cac905263c7f37eea46674a5326f';


export const processPayment = catchAsyncError(async(req,res,next)=>{
     const myPayment =  await stripe.paymentIntents.create({
         amount:req.body.amount,
         currency:'inr',
         metadata:{
             company:'Electrosphere inc',
             
         }
     });
     res.status(200).json({
         success:true,
         client_secret: myPayment.client_secret
     })
});
export const sendStipePublishableKey = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        stripe_publishable_key:process.env.STRIPE_PUBLISHABLE_KEY
    })
});

export const createPayment = catchAsyncError(async(req,res,next)=>{

    const {shippingInfo,user,cartItems} = req.body;
     
       const customer = await stripe.customers.create({
         email:user.email,
         name:user.name,
         metadata:{
           cart:JSON.stringify(cartItems),
            userId:user._id,
            shipping:JSON.stringify(shippingInfo)
         }
       });
   
    const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        
        shipping_options: [
          { shipping_rate: 'shr_1Ls97rSDdRNXOkkShu2lHE89' },
          {shipping_rate:'shr_1Ls96cSDdRNXOkkS6VZXtoq6'}
        ],

        line_items: req.body.cartItems.map((item) => {
            const img = item.image;
  
            return {
              price_data: { 
                currency: 'inr',
                product_data: { 
                  name: item.name,
                  images: [img],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                maximum:item.stock
              },
              quantity: item.quantity
            }
          }),
      
        mode: 'payment',
        customer:customer.id,

    success_url: `http://localhost:3000/success`,
    cancel_url: 'http://localhost:3000/cancel',

      }
     
      const session = await stripe.checkout.sessions.create(params);
      
      res.status(200).json(session);
});

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
 }
const createOrder = catchAsyncError(async(customer,data)=>{
 const cartItems = JSON.parse(customer.metadata.cart);
 const shippingInfo =JSON.parse(customer.metadata.shipping);
 const order = await Order.create({
   shippingInfo,
   orderItems:cartItems,
   itemsPrice:data.amount_subtotal,
   taxPrice:Math.round(data.amount_subtotal*0.18),
   shippingPrice:199,
   totalPrice:data.amount_total,
   paidAt:Date.now(),
   user:customer.metadata.userId,
   paymentInfo:{
     id:data.payment_intent,
     status:data.payment_status
   }
 });
 

})
export const webHookEndpoint = catchAsyncError(async(req,res,next)=>{

    const payload = req.rawBody;

    const sig = req.headers['stripe-signature'];


     let event; 
  

    try {
     event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);


    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      stripe.customers.retrieve(session.customer).then(customer=>{
      

        createOrder(customer,session); 
      }).catch(err=>console.log(err.message));
     
    }
  
    res.status(200);
    
});