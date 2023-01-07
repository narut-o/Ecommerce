import app from "./app.js"
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import cloudinary from "cloudinary";
dotenv.config();

//Uncaught Error
process.on("uncaughtException",(error)=>{
    console.log(`Error: ${error.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

const PORT = process.env.PORT;
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server =  app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`);});




//Unhandled Promise Rejection
process.on("unhandledRejection",(error)=>{
    console.log(`Error: ${error.message}`);
    console.log("Shutting down the server due to undhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})
