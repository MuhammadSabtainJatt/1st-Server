const express= require("express");
const mongoose = require("mongoose");
const cors= require("cors");

require("dotenv").config();


// create app 
const app= express();


// cors
app.use(cors());
app.use(express.json());

// Routes Setup 
const userRoutes = require('./src/Routes/userRoutes');

app.use('/', userRoutes);


mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,

    useUnifiedTopology:true,

})

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{
    console.log("Connected to MongoDB");

    app.listen(3000,()=>{
        console.log("server listning on port 3000 ");
    });
});
