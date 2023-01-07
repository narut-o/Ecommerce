import express from "express";
import {processPayment, sendStipePublishableKey, createPayment, webHookEndpoint } from "../controllers/paymentController.js";
import {auth}from "../middleware/auth.js";





const router = express.Router();


router.post('/payment/process',auth,processPayment);
router.get('/stripeapikey',auth,sendStipePublishableKey);
router.post('/payment/request',createPayment);
router.post('/payment/webhook',webHookEndpoint);

export default router;