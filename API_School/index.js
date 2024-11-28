const express = require("express");
require("dotenv").config(); // configuro mi servidor para usar variable de entorno
const connectDB = require('./src/utils/db_mongo');
const routes = require('./src/api/routers/routes');
const cloudinary = require("cloudinary").v2;
connectDB();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

const server = express();
server.use(express.json());

const PORT = process.env.PORT;


server.use("/", routes);

server.listen(process.env.PORT, ()=>{
    console.log(`server running port http://localhost:${PORT}`);
});

