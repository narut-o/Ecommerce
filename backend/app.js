import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js"
import errorMiddleWare from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import Stripe from "stripe";
import * as dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_232b4afd3a55fa8717d190d3d4f5b9bc0a96cac905263c7f37eea46674a5326f';




const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);
app.use('/api/v1',paymentRoute);
app.use(errorMiddleWare);





export default app;